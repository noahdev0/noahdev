"use client";
import React from "react";
import { motion } from "framer-motion";
import { Server, Database, PenTool, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const SkillsPage = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      icon: <Code className="h-8 w-8 text-blue-600" />,
      skills: [
        { name: "React", level: 90, color: "bg-blue-500" },
        { name: "Next.js", level: 85, color: "bg-gray-800" },
        { name: "Vue.js", level: 75, color: "bg-green-500" },
        { name: "Tailwind CSS", level: 85, color: "bg-cyan-500" },
        { name: "TypeScript", level: 80, color: "bg-blue-700" },
      ],
    },
    {
      title: "Backend Technologies",
      icon: <Server className="h-8 w-8 text-green-600" />,
      skills: [
        { name: "Node.js", level: 85, color: "bg-green-700" },
        { name: "Python", level: 80, color: "bg-yellow-600" },
        { name: "Django", level: 75, color: "bg-green-800" },
        { name: "Express.js", level: 80, color: "bg-gray-700" },
      ],
    },
    {
      title: "Databases",
      icon: <Database className="h-8 w-8 text-purple-600" />,
      skills: [
        { name: "MongoDB", level: 85, color: "bg-green-500" },
        { name: "PostgreSQL", level: 75, color: "bg-blue-700" },
        { name: "MySQL", level: 70, color: "bg-orange-500" },
      ],
    },
    {
      title: "Tools & DevOps",
      icon: <PenTool className="h-8 w-8 text-red-600" />,
      skills: [
        { name: "Git", level: 90, color: "bg-orange-600" },
        { name: "Docker", level: 80, color: "bg-blue-700" },
        { name: "Webpack", level: 70, color: "bg-cyan-600" },
        { name: "CI/CD", level: 75, color: "bg-indigo-600" },
      ],
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 text-primary"
          >
            My Technical Skills
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card className="h-full ">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {category.icon}
                      <CardTitle className="text-xl">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {skill.level}%
                          </span>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-full">
                              <Progress
                                value={skill.level}
                                className={`"h-2" ${skill.color}`}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {skill.name}: {skill.level}% proficiency
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Continuous Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {`Technology evolves rapidly, and I'm committed to staying at
                  the forefront. I continuously explore new technologies, attend
                  workshops, and work on personal projects to expand my skill
                  set and keep my knowledge cutting-edge.`}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SkillsPage;
