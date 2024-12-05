"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CodeBracketIcon,
  StarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

const AboutPage = () => {
  const skills = [
    {
      category: "Frontend",
      icon: CodeBracketIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      technologies: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "Vue.js",
      ],
    },
    {
      category: "Backend",
      icon: GlobeAltIcon,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      technologies: ["Node.js", "Express", "Django", "Python", "MongoDB"],
    },
    {
      category: "Tools & DevOps",
      icon: StarIcon,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      technologies: ["Git", "Docker", "Webpack", "CI/CD", "Vercel"],
    },
  ];

  const experiences = [
    {
      title: "Web Developer",
      company: "Freelance",
      period: "2023 - Present",
      description:
        "Delivering custom web solutions for clients across various industries.",
    },
    {
      title: "Junior Web Developer",
      company: "FoorWeb",
      period: "2022 - 2022",
      description:
        "Developed and maintained web applications using modern JavaScript frameworks.",
    },
    {
      title: "High school Graduate",
      company: "Local University",
      period: "2017 - 2021",
      description: "Completed high school with a focus on web technologies.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 space-y-16"
      >
        {/* Profile Overview */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl -z-10 blur-2xl" />
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/ZED.jpg"
                alt="Nouh Ben Zina"
                width={500}
                height={500}
                className="rounded-xl object-cover shadow-lg"
                priority
              />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <Badge variant="secondary" className="mb-4">
                Web Developer
              </Badge>
              <h1 className="text-4xl font-bold text-foreground">About Me</h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-4 text-lg text-muted-foreground"
            >
              <p>
                {"  Hey there! I'm Nouh Ben Zina, a passionate"} web developer
                with a love for creating innovative digital solutions. My
                journey in tech is driven by curiosity and a desire to solve
                complex problems through elegant code.
              </p>
              <p>
                With a strong background in full-stack development, I specialize
                in building responsive, performant web applications that provide
                exceptional user experiences.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
                My Technical Skills
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {skills.map((skillGroup) => (
                  <motion.div
                    key={skillGroup.category}
                    whileHover={{ scale: 1.03 }}
                    className={`${skillGroup.bgColor} p-6 rounded-lg transition-shadow hover:shadow-lg`}
                  >
                    <div className="flex items-center mb-6">
                      <skillGroup.icon
                        className={`h-8 w-8 ${skillGroup.color} mr-3`}
                      />
                      <h3 className="text-2xl font-semibold text-foreground">
                        {skillGroup.category}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {skillGroup.technologies.map((tech) => (
                        <motion.li
                          key={tech}
                          whileHover={{ x: 4 }}
                          className="text-muted-foreground flex items-center"
                        >
                          <span
                            className={`w-2 h-2 ${skillGroup.color.replace(
                              "text",
                              "bg"
                            )} rounded-full mr-3`}
                          />
                          {tech}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Professional Journey */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
            My Professional Journey
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-4 border-primary pl-6">
              {experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="mb-8 pl-6 relative before:absolute before:w-4 before:h-4 
                           before:bg-primary before:rounded-full before:-left-[34px] 
                           before:top-1"
                >
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-foreground">
                      {experience.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {experience.company} | {experience.period}
                    </p>
                    <p className="text-muted-foreground/80">
                      {experience.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
