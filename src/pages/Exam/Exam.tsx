import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { test } from "./exam_placeholder";

export const Exam = () => {
  const [answers, setAnswers] = useState<any>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const { code } = useParams();
  const { questions } = test;

  const updateAnswers = (opts: any, value: string, idx: number) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
    if (opts === undefined) return;
    const filtered = opts.filter((opt: any) => opt.text === value)[0];
    if (filtered.isCorrect) setPoints(points + 1);
  };

  const handleComplete = () => {
    console.log({ answers, points });
  };

  return (
    <div className="flex justify-center content-center items-center">
      <Card variant="outline" width="5xl" height="xl">
        <CardHeader>
          <Badge colorScheme="purple" variant="solid" size="lg">
            # {code}
          </Badge>
          <Progress value={tabIndex} min={0} max={questions.length} />
        </CardHeader>
        <CardBody>
          <Tabs variant="enclosed" index={tabIndex} onChange={setTabIndex}>
            <TabList>
              {questions.map((_, i) => (
                <Tab
                  key={i}
                  isDisabled={i === 0 ? false : answers[i - 1] ? false : true}
                >
                  {i + 1}
                </Tab>
              ))}
              <Tab
                // NOTE: Maybe can i use this to check if all questions are answered?
                // isDisabled={answers.length === questions.length ? false : true}
                isDisabled={answers[questions.length - 1] ? false : true}
              >
                Complete
              </Tab>
            </TabList>
            <TabPanels>
              {questions.map(({ question, options, type }, i) => (
                <TabPanel key={i}>
                  <div className="flex flex-col gap-4 my-5">
                    <Heading size="xl">Question {i + 1}</Heading>
                    <Text fontSize="xl">{question}</Text>
                  </div>
                  <Divider />
                  <form className="my-5">
                    {type === "multiple" ? (
                      <RadioGroup
                        onChange={(value) =>
                          updateAnswers(questions[i].options, value, i)
                        }
                        value={answers[i]}
                      >
                        <Stack gap={10}>
                          {options &&
                            options.map((opt, i) => (
                              <Radio value={opt.text} key={i}>
                                {opt.text}
                              </Radio>
                            ))}
                        </Stack>
                      </RadioGroup>
                    ) : (
                      <Textarea
                        placeholder="Your answer here..."
                        value={answers[i]}
                        onChange={(e) =>
                          updateAnswers(questions[i]?.options, e.target.value, i)
                        }
                      />
                    )}
                  </form>
                </TabPanel>
              ))}
              <TabPanel>
                <div className="flex flex-col gap-4 my-5">
                  <Heading size="xl">Complete</Heading>
                  <Text fontSize="xl">
                    Are you sure you want to complete the exam?
                  </Text>
                  <Button
                    onClick={handleComplete}
                    variant="solid"
                    colorScheme="green"
                  >
                    Complete, Submit and Exit...
                  </Button>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};