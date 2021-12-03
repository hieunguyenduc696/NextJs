import MeetupDetail from "../../components/meetups/MeetupDetail";
import { ObjectId, MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetail
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://hieun:Thienlonghieu123@cluster0.sehw1.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const MeetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://hieun:Thienlonghieu123@cluster0.sehw1.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetup = await meetupsCollection.findOne({ _id: ObjectId(MeetupId) });
  client.close();
  return {
    props: {
      image: meetup.image,
      title: meetup.title,
      address: meetup.address,
      description: meetup.description,
      id: meetup._id.toString(),
    },
  };
}

export default MeetupDetails;
