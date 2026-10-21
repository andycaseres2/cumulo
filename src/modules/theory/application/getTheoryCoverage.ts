import { EXAM_TASKS, type ExamTask } from '@/modules/exam/domain/ExamTask';
import { allInScopeServices } from '@/modules/exam/domain/inScopeServices';
import { compareTopics, type Topic } from '../domain/Topic';
import type { TopicRepository } from '../domain/TopicRepository';

export interface TaskCoverage {
  task: ExamTask;
  topics: Topic[];
}

export interface TheoryCoverage {
  tasks: TaskCoverage[];
  missingTasks: ExamTask[];
  coveredServices: number;
  totalServices: number;
  missingServices: string[];
  isComplete: boolean;
}

/** How much of the official exam guide the theory covers. */
export async function getTheoryCoverage(repository: TopicRepository): Promise<TheoryCoverage> {
  const topics = (await repository.findAll()).sort(compareTopics);
  const tasks = EXAM_TASKS.map((task) => ({
    task,
    topics: topics.filter((topic) => topic.examTasks.includes(task.id)),
  }));
  const mentioned = new Set(topics.flatMap((topic) => topic.services));
  const inScope = allInScopeServices();
  const missingServices = inScope.filter((service) => !mentioned.has(service));
  const missingTasks = tasks.filter((entry) => entry.topics.length === 0).map((entry) => entry.task);

  return {
    tasks,
    missingTasks,
    coveredServices: inScope.length - missingServices.length,
    totalServices: inScope.length,
    missingServices,
    isComplete: missingTasks.length === 0 && missingServices.length === 0,
  };
}
