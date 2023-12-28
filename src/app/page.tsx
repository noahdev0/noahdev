"use client";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/Card";
import ProjectImages from "@/components/ProjectImages";
import { cards } from "@/utils/index";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { BsFillMoonStarsFill } from "react-icons/bs";
import NavBar from "../components/NavBar";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [replay, setReplay] = useState(true);
  const controls = useAnimation();

  const { ref, inView } = useInView();
  const { ref: secounRef, inView: scoundElement } = useInView();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (inView) {
      timeoutId = setTimeout(() => {
        controls.start("visible");
      }, 500); // Delay animation start by 500ms
    } else {
      controls.start("hidden");
    }
    if (scoundElement) {
      timeoutId = setTimeout(() => {
        controls.start("visible");
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [controls, inView]);

  const headerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className=" bg-white overflow-hidden  dark:bg-gray-900 md:px-20 lg:px-40">
        <section className="min-h-screen ">
          <NavBar onClick={toggleDarkMode} />

          <div className="text-center py-10 md:px-20 lg:px-40">
            <motion.h2
              initial="hidden"
              animate={replay ? "visible" : "hidden"}
              variants={headerContainer}
              className="text-5xl py-2 text-teal-600 font-medium dark:text-teal-400 md:text-6xl"
            >
              {"NoahDev0".split("").map((char, index) => (
                <motion.span
                  key={char + "-" + index}
                  animate={{
                    x: [0, 10, -10, 0].map(
                      (x) => (Math.random() - 0.5) * x * 50
                    ),
                    y: [0, 10, -10, 0].map(
                      (y) => (Math.random() - 0.5) * y * 100
                    ),
                  }}
                  
                  transition={{ duration: 5 }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  className="inline-block"
                 
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
            <h3 className="text-2xl py-2 dark:text-white md:text-3xl">
              Full Stack web developer
            </h3>
            <p className="text-md p-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
              Freelancer providing services for programming and design content
              needs. Join me down below and let&apos;s be awesome !
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="text-5xl flex justify-around  md:gap-16 p-1 text-gray-600 dark:text-green-300"
            >
              <motion.div variants={item}>
                <Link href="https://github.com/noahdev0">
                  <AiFillGithub />
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <Link href="https://www.facebook.com/nouh.benzina.39">
                  <AiFillFacebook />
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <Link href="https://www.instagram.com/noahbenzina/">
                  <AiOutlineInstagram />
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <Link href="https://www.linkedin.com/in/nouh-ben-zina-5b6703202/">
                  <AiFillLinkedin />
                </Link>
              </motion.div>
            </motion.div>
            <div className="mx-auto container bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 relative overflow-hidden mt-20 md:h-96 md:w-96 border-8 border-spacing-4 border-white outline-dashed outline-4">
              <Image
                src={"/noah.png"}
                layout="fill"
                objectFit="cover"
                alt=""
                className="rounded-full "
              />
            </div>
          </div>
        </section>
        <motion.section>
          <div className="px-3 ">
            <motion.h3
              className="text-6xl py-1 dark:text-white text-center my-5"
              variants={item}
              initial="hidden"
              animate={controls}
              ref={ref}
            >
              Services I offer
            </motion.h3>
            <p className="text-md  text-2xl text-center py-10 leading-8 text-gray-800 dark:text-gray-200">
              As a web development freelancer, I offer a range of services
              including website design and development, e-commerce website
              development, content management system development, web
              application development, website maintenance and support, search
              engine optimization, responsive website design, website hosting
              and
              <span className="text-teal-500  bg-slate-700 px-3">
                {" "}
                server administration{" "}
              </span>{" "}
              , web analytics and reporting, and social media integration. I
              specialize in providing customized solutions for each
              client&apos;s unique needs, utilizing my skills and experience to
              deliver{" "}
              <span className="text-teal-500 bg-slate-700 px-3">
                high-quality{" "}
              </span>{" "}
              results.
            </p>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              I offer from a wide range of services, including brand design,
              programming and teaching.
            </p>
          </div>
          <div className="lg:flex gap-10 p-10 md:p-0">
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                content={card.content}
                subtitle={card.subtitle}
                image={card.image}
                list={card.list}
              />
            ))}
          </div>
        </motion.section>
        <section className="py-10">
          <div>
            <h3 className="text-5xl py-1 dark:text-white text-center">
              Portofolio
            </h3>
            <p className="text-md text-2xl py-2 px-3 leading-8 text-gray-800 text-center dark:text-gray-200">
              Since the beginning of my journey as a freelance designer and
              developer, I&apos;ve done remote work for
              <span className="text-teal-500  bg-slate-700 dark:bg-slate-400 dark:text-teal-950 px-3">
                {" "}
                agencies{" "}
              </span>
              consulted for{" "}
              <span className="text-teal-500  bg-slate-700 dark:bg-slate-400 dark:text-teal-950 px-3">
                startups{" "}
              </span>
              and collaborated with talanted people to create digital products
              for both business and consumer use.
            </p>
            <p className="text-md p-4 my-5 border-t-2 border-b-2 text-2xl leading-8 text-gray-800 dark:text-gray-200">
              I offer from a wide range of services, including brand design,
              programming and teaching.
            </p>
          </div>
          <ProjectImages />
        </section>
      </main>
    </div>
  );
}
