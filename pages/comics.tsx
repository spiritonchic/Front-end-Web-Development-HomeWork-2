import React from "react";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { ISizeCalculationResult } from "image-size/dist/types/interface";
import sizeOf from "image-size";
import { formatDistanceToNow } from "date-fns";
import fetch, {Response} from 'node-fetch';
import Head from "next/head";


interface ComicsProps {
  comicData: comicsResponse;
}

interface comicsResponse {
  img: string;
  alt: string;
  title: string;
  year: number;
  month: number;
  day: number;
  width: number;
  height: number;
}

const Comics: React.FC<ComicsProps> = ({ comicData }) => {
  const secureData = (data: string) => {
    return DOMPurify.sanitize(data, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  };

  const secureTitle = secureData(comicData.title);
  const secureAlt = secureData(comicData.alt);

  const date_: Date = new Date(
    comicData.year,
    comicData.month - 1,
    comicData.day,
  );

  const res: string =
    date_.toLocaleDateString() +
    " — " +
    formatDistanceToNow(date_, { addSuffix: true });

  return (
    <>
    <Head>
        <title>Comics</title> 
        <meta name="description" content="Comics display" /> 
    </Head>
    <div className="comics">
      <p className="head-text">Comics</p>
      <p id="comic-title" className="comics-text">
        {secureTitle}
      </p>
      <Image
        id="comic-img"
        className="comic-img"
        src={comicData.img}
        alt={secureAlt}
        width={comicData.width}
        height={comicData.height}
      />
      <p id="comic-date" className="comics-text">
        {res}
      </p>
    </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const email: string = "i.ershov@innopolis.university";

  try {
    const idResponse: Response = await fetch(
      `https://fwd.innopolis.university/api/hw2?email=${email}`,
    );
    const idData: string = await idResponse.text();
    const comicResponse: Response = await fetch(
      `https://fwd.innopolis.university/api/comic?id=${idData}`,
    );
    const comicData: comicsResponse = await comicResponse.json() as comicsResponse;

    const imageResponse: Response = await fetch(comicData.img);
    const arrayBuffer: ArrayBuffer = await imageResponse.arrayBuffer();
    const buffer: Buffer = Buffer.from(arrayBuffer);
    const dimensions: ISizeCalculationResult = sizeOf(buffer);

    comicData.width = dimensions.width!;
    comicData.height = dimensions.height!;

    return {
      props: {
        comicData,
      },
    };
  } catch (error) {
    console.error("Error fetching comic:", error);
    return {
      notFound: true,
    };
  }
};

export default Comics;
