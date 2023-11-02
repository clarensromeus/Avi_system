"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Legend, Tooltip } from "chart.js/auto";
import { sum } from "lodash";

// internally crafted imports of resources
import { useGetAdministratorsQuery } from "@/ReduxConfig/CodeSpliting/Administrator";
import { useGetStudentsQuery } from "@/ReduxConfig/CodeSpliting/Students";
import { useGetTeachersQuery } from "@/ReduxConfig/CodeSpliting/Teacher";

ChartJS.register(Legend, Tooltip);

export default function Page() {
  const { data } = useGetAdministratorsQuery();
  const { data: student } = useGetStudentsQuery();
  const { data: teacher } = useGetTeachersQuery();

  const total = sum([
    parseInt(`${data?.length}`, 10),
    parseInt(`${student?.length}`, 10),
    parseInt(`${teacher?.length}`, 10),
    14,
  ]);

  return (
    <>
      <Box>
        <Bar
          options={{}}
          data={{
            labels: [
              "Administrators",
              "Students",
              "Teachers",
              "Courses",
              "Total",
            ],
            datasets: [
              {
                label: "System analytics",
                data: [
                  data?.length ?? 0,
                  student?.length ?? 0,
                  teacher?.length ?? 0,
                  14,
                  total,
                ],
                backgroundColor: ["rgba(75, 192, 192, 1)", "#ecf0f1"],
              },
            ],
          }}
        />
      </Box>
    </>
  );
}
