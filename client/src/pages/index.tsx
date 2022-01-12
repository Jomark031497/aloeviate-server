import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

import TopActionButtons from "../components/TopActionButtons";
import Timer from "../components/Timer";
import TasksContainer from "../components/TasksContainer";
import AddTask from "../components/AddTask";
import BottomActionButtons from "../components/BottomActionButtons";
import useSWR from "swr";

const Home: NextPage = () => {
  const { data: tasks } = useSWR("/tasks");
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Container maxWidth="sm" sx={{ backgroundColor: "#f5f5f5", minHeight: "93vh" }}>
          <TopActionButtons />
          <Timer tasks={tasks} />
          <TasksContainer tasks={tasks} />
          <AddTask />
          <BottomActionButtons />
        </Container>
      </>
    </div>
  );
};

export default Home;
