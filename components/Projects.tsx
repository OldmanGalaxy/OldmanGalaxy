"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string;
  image: string;
  deployLink?: string;
  videoLink?: string;
  imagePosition?: "left" | "right";
  isLoading?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  image,
  deployLink,
  videoLink,
  imagePosition = "right",
  isLoading = false,
}) => {
  const LoadingContent = () => (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-8 bg-cyellow/20 rounded w-3/4"></div>
      <div className="h-4 bg-cwhite/20 rounded w-1/2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-cwhite/20 rounded w-full"></div>
        <div className="h-4 bg-cwhite/20 rounded w-5/6"></div>
      </div>
    </div>
  );

  const LoadingImage = () => (
    <div className="w-full h-96 bg-gray-800 rounded-lg animate-pulse">
      <div className="w-full h-full bg-gray-700/50 rounded-lg"></div>
    </div>
  );

  const content = isLoading ? (
    <LoadingContent />
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-2">
      <motion.h2
        className="text-4xl font-extrabold font-code text-cyellow"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}>
        {title}
      </motion.h2>
      <div className="text-base font-medium text-cwhite font-martel">
        Tech: {technologies}
      </div>
      <p className="text-sm text-cwhite font-martel mt-2">{description}</p>
      <motion.div
        className="flex font-martel gap-4 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}>
        {deployLink && (
          <motion.a
            href={deployLink}
            className="text-cyellow hover:text-cwhite text-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            Live Deploy
          </motion.a>
        )}
        {videoLink && (
          <motion.a
            href={videoLink}
            className="text-cyellow hover:text-cwhite text-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            Video Link
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );

  const imageElement = isLoading ? (
    <LoadingImage />
  ) : (
    <motion.img
      src={image}
      alt={title}
      className="rounded-lg w-full h-96 object-contain bg-gray-800"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    />
  );

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-8 mb-16 items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}>
      <div className="w-full block md:hidden">{imageElement}</div>
      <div className="w-full block md:hidden">{content}</div>

      {imagePosition === "left" && (
        <div className="hidden md:block md:w-1/2">{imageElement}</div>
      )}
      <div className="hidden md:block md:w-1/2">{content}</div>
      {imagePosition === "right" && (
        <div className="hidden md:block md:w-1/2">{imageElement}</div>
      )}
    </motion.div>
  );
};

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const projects = [
    {
      title: "Forest Focus",
      technologies: "ReactJS, ThreeJS, GSAP, Javascript, MongoDB",
      description:
        "Secured 2nd place in Web Wonders competition by Nexus. Website made to spread awareness of forestry and wildlife.",
      image: "/images/forestfocus.png",
      videoLink: "https://drive.google.com/file/d/14W0e3BYwJ_z6GF_HAsOWW7o9M6YaxApX/view?usp=drive_link",
      imagePosition: "left" as "left",
    },
    {
      title: "Zero Cow Factory",
      technologies: "NextJS, Motion, Typescript",
      description:
        "Revamped website for a local startup. Much better UI/UX. Smoother animations and better design.",
      image: "/images/zerocow.png",
      deployLink: "https://zerocowfactory.netlify.app/",
      imagePosition: "right" as "right",
    },
    {
      title: "Wiki War$ (WIP)",
      technologies: "NextJS, Typescript, Firebase, Motion",
      description:
        "Online game involving strategy and general knowledge. Realtime bidding of Wikipedia pages, user with most views wins.",
      image: "/images/wikiwars.png",
      deployLink: "/",
      imagePosition: "left" as "left",
    },
    {
      title: "Personal Portfolio",
      technologies: "NextJS, Motion, Typescript, Express, EmailJS",
      description:
        "My resume in the form of a website. Cool animations and design.",
      image: "/images/portfolio.png",
      deployLink: "/",
      imagePosition: "right" as "right",
    },
  ];

  return (
    <div id="projects" className="min-h-screen bg-cblack p-8 relative">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <AnimatePresence>
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} isLoading={isLoading} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Projects;
