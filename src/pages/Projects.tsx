
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Project } from '@/types/Project';
import { previousProjects } from '@/data/projectsData';
import ProjectCard from '@/components/ProjectCard';
import VideoDialog from '@/components/VideoDialog';
import { toast } from '@/components/ui/use-toast';

const Projects = () => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [customProjects, setCustomProjects] = useState<Project[]>([]);
  
  const openVideoDialog = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setVideoDialogOpen(true);
  };
  
  const allProjects = [...customProjects, ...previousProjects];
  
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Previous Works</span>
            <h1 className="text-4xl md:text-5xl font-medium mt-2">Previous Projects</h1>
            <p className="mt-4 text-muted-foreground">
              A curated selection of my past exhibitions, collaborations, and commissioned works 
              from throughout my artistic career.
            </p>
          </div>
          
          <div className="space-y-20">
            {allProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
                onVideoPlay={openVideoDialog}
              />
            ))}
          </div>
        </div>
      </section>
      
      <VideoDialog 
        open={videoDialogOpen}
        videoUrl={currentVideoUrl}
        onOpenChange={setVideoDialogOpen}
      />
    </Layout>
  );
};

export default Projects;
