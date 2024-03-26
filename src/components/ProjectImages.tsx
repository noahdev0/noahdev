import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProjectImages: React.FC = () => {
  const images = [
    "/web1.png",
    "/web2.png",
    "/web3.png",
    "/web4.png",
    "/web5.png",
    "/web6.png",
  ];
  //   return (
  //     <div className={""}>
  //       {/* eeddza */}
  //       {images.map((image, index) => (
  //         <motion.div
  //           whileHover={{ scale: 1.2 }}
  //           className="basis-1/4 flex-1 shadow-xl"
  //           key={index}
  //         >
  //           <img src={image} alt={`Image ${index}`} />
  //         </motion.div>
  //       ))}
  //     </div>
  //   );
  // };
  return (
    <Carousel className="dark:text-foreground ">
      <CarouselContent className="">
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="mx-auto ">
              <Card className="w-full dark:bg-slate-800">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="basis-1/4 flex-1 shadow-xl"
                    key={index}
                  >
                    <img src={image} alt={`Image ${index}`} />
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProjectImages;
