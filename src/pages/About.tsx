
import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="animate-fade-in-up">
                <span className="text-sm uppercase tracking-widest text-muted-foreground">About</span>
                <h1 className="text-4xl md:text-5xl font-medium mt-2 mb-8">Kassia Marin</h1>
                
                <div className="relative">
                  <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 bg-accent -z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80" 
                    alt="Kassia Marin in her studio" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-6 text-muted-foreground animate-fade-in">
                <p>
                  I am a contemporary visual artist based in Norway, working across painting, mixed media, text, and video art. 
                  My practice delves into the complex nature of memory, identity, and perception. 
                  I explore how personal histories are shaped by time and how memories, often fragile and elusive, can be transformed and distorted over time. 
                  Through my work, I examine the constant negotiation between the past and the present, questioning the reliability of memory and its emotional weight.
                </p>
                
                <p>
                  After completing my formal education in Fine Arts at the Oslo National Academy of the Arts,
                  I've dedicated my career to exploring how our memories and dreams influence our emotional and psychological landscapes. 
                  My work often intertwines text and imagery, creating a dialogue that bridges personal experience with broader universal themes.
                </p>
                
                <p>
                  The core of my artistic process involves both introspection and external observation. 
                  I immerse myself in moments of stillness, such as sleepless nights, where memories, dreams, and fragmented thoughts resurface. 
                  These moments provide me with material for my work, which often manifests through layered paintings and video installations. I use these mediums to evoke emotional responses, 
                  capturing the instability of memory and the fluidity of time.
                </p>
                
                <p>
                  A key aspect of my practice is incorporating text into my work, a method I use to manifest thoughts and memories that might otherwise fade.   
                  I see the act of writing as a way to translate ephemeral experiences into something concrete, bridging the gap between thought and reality.   
                  In my video works, I capture the stillness of the world around me, while inner thoughts and fragmented narratives disrupt that silence.
                </p>

                <p>
                  Ultimately, I seek to explore how our memories shape our understanding of the world and our identities.   
                  I believe that through art, we can reframe and re-interpret our pasts, creating new ways of seeing and being.   
                  My hope is that my work invites the viewer to reflect on their own memories and experiences, fostering a deeper connection to their own inner worlds and to the world around them.
                </p>
              </div>
            </div>
            
            <div className="mt-20 grid md:grid-cols-2 gap-12 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-medium mb-6">Education</h2>
                <ul className="space-y-4">
                  <li>
                    <div className="text-sm text-muted-foreground">2021 - 2024</div>
                    <div className="font-medium">Bachelor of Fine Art</div>
                    <div>Oslo National Academy of The Arts</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2019 - 2021</div>
                    <div className="font-medium">Higher Vocational Education in Visual Arts</div>
                    <div>Einar Granum School of Art, Norway</div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-medium mb-6">Awards & Recognition</h2>
                <ul className="space-y-4">
                  <li>
                    <div className="text-sm text-muted-foreground">2022</div>
                    <div className="font-medium">Nordic Arts Council Grant</div>
                    <div>For the project "Nature Reimagined"</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2020</div>
                    <div className="font-medium">Emerging Artist Award</div>
                    <div>Contemporary Arts Foundation, Stockholm</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2018</div>
                    <div className="font-medium">Residency Program</div>
                    <div>International Arts Colony, Copenhagen</div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-20 animate-fade-in">
              <h2 className="text-2xl font-medium mb-6">Artist Statement</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                 In my practice, I aim to create a visual language that navigates the intersection between memory, personal experience, and abstraction.
                  Drawing from the fluidity of my own recollections and the manipulation of time, my work examines themes of uncertainty, transformation, and the complex nature of how we remember.
                </p>
                
                <p>
                  I am deeply interested in how light, texture, and space can evoke emotional responses and narrate the stories of our inner worlds. 
                  Through an intuitive process of layering, mark-making, and material exploration, my pieces invite viewers to step into a space where memories are not simply recalled but reinterpreted. 
                  In doing so, I attempt to give form to that which is often intangible — the fragile nature of memory itself.
                </p>
                
                <p>
                  Each artwork is a meditation on presence and absence, on the balance between remembering and forgetting, and on the ephemeral quality of our personal histories.
                  My practice emphasizes the ongoing dialogue between what we perceive and what we cannot fully grasp. 
                  In a time when our experiences are often mediated through digital screens, I believe in the enduring power of physical artworks to forge authentic connections, to provoke introspection, and to offer a space for reflection on the nature of memory and identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
