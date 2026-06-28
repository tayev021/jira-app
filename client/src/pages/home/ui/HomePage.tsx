import { useAuth } from '../../../shared/hooks/useAuth';
import { Link, Navigate } from 'react-router';
import { Container } from '../../../shared/ui/Container';
import {
  HiChevronRight,
  HiCubeTransparent,
  HiLink,
  HiOutlineChatBubbleLeftRight,
  HiOutlinePresentationChartLine,
  HiOutlineRectangleGroup,
} from 'react-icons/hi2';

export function HomePage() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="h-full overflow-y-auto">
      <section>
        <Container className="grid grid-cols-2 gap-5 px-10 py-15">
          <div>
            <h2 className="mb-3 font-bold text-5xl">More projects</h2>
            <h2 className="mb-3 font-bold text-5xl">More progress</h2>
            <h2 className="mb-6 font-bold text-5xl">Less chaos</h2>
            <p className="font-semibold text-xl">
              Everything your team needs to organize tasks, collaborate, and
              deliver results
            </p>
          </div>
          <div className="w-70 flex flex-col justify-center gap-2 mx-auto">
            <Link
              to="/auth/signup"
              className="px-6 py-3 border-2 border-primary rounded-full bg-primary text-center shadow-sm font-medium text-base text-secondary-text leading-none hover:bg-primary-dark hover:border-primary-dark"
            >
              Get Started
            </Link>
            <div className="relative px-20 mx-4">
              <p className="absolute left-0 top-1/2 w-full border-b-2 border-gray-primary -z-10"></p>
              <p className="px-2 bg-primary-bg text-center">OR</p>
            </div>
            <Link
              to="/auth/signin"
              className="px-6 py-3 border-2 border-primary rounded-full bg-primary-bg shadow-sm font-medium text-base text-primary text-center leading-none hover:border-primary-dark hover:text-primary-dark"
            >
              Continue
            </Link>
          </div>
        </Container>
      </section>
      <section className="bg-linear-[40deg] from-primary from-35% to-blue-primary to-50%">
        <Container className="grid grid-cols-2 gap-10 px-10 py-15 text-secondary-text">
          <div>
            <h3 className="mb-3 font-semibold text-4xl">Project workflow</h3>
            <p className="font-medium text-lg">
              A simple workflow from planning to delivery
            </p>
          </div>
          <ul className="flex flex-col gap-2 mx-auto text-lg">
            <li className="flex items-center gap-2">
              <HiChevronRight />
              <span>create issues in your workspace</span>
            </li>
            <li className="ml-8 flex items-center gap-2">
              <HiChevronRight />
              <span>choose responsible team members</span>
            </li>
            <li className="ml-16 flex items-center gap-2">
              <HiChevronRight />
              <span>monitor progress from start to finish</span>
            </li>
            <li className="ml-24 flex items-center gap-2">
              <HiChevronRight />
              <span>keep projects moving and meet deadlines</span>
            </li>
          </ul>
        </Container>
      </section>
      <section>
        <Container className="px-10 py-15">
          <h3 className="mb-8 font-semibold text-4xl text-center">
            Every team starts with Jira
          </h3>
          <ul className="grid grid-cols-[repeat(4,minmax(150px,1fr))] gap-5 justify-center">
            <li className="">
              <HiOutlineRectangleGroup className="w-12 h-12 mb-2 text-yellow-primary" />
              <h3 className="mb-1 font-semibold text-lg">Issue Tracking</h3>
              <p>
                Create, prioritize, and manage issues throughout their lifecycle
              </p>
            </li>
            <li>
              <HiOutlineChatBubbleLeftRight className="w-12 h-12 mb-2 text-green-primary" />
              <h3 className="mb-1 font-semibold text-lg">Team Collaboration</h3>
              <p>Assign tasks, share updates, and work together efficiently</p>
            </li>
            <li>
              <HiCubeTransparent className="w-12 h-12 mb-2 text-purple-primary" />
              <h3 className="mb-1 font-semibold text-lg">Custom Workspaces</h3>
              <p>Organize projects and teams in workspaces</p>
            </li>
            <li>
              <HiOutlinePresentationChartLine className="w-12 h-12 mb-2 text-red-primary" />
              <h3 className="mb-1 font-semibold text-lg">
                Progress Visibility
              </h3>
              <p>Visualize work and move tasks through each stage</p>
            </li>
          </ul>
        </Container>
      </section>
      <section className="shadow-t-lg">
        <Container className="flex-row justify-center gap-3 px-5 p-2.5 text-base">
          <p>&copy; 2026 Eugene Taranov</p>
          <a
            className="group flex items-center gap-1"
            href="https://t.me/tayev"
            target="_blank"
          >
            <HiLink className="w-5 h-5 text-primary" />
            <span className="border-b border-transparent font-medium group-hover:border-primary group-hover:text-primary">
              t.me/tayev
            </span>
          </a>
        </Container>
      </section>
    </div>
  );
}
