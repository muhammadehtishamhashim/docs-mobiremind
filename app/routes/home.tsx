import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Link } from 'react-router';
import { baseOptions } from '@/lib/layout.shared';
import { Book, Mic, ArrowRight } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'MobiRemind Documentation' },
    { name: 'description', content: 'Explore the documentation for MobiRemind and Voice Agents.' },
  ];
}

export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-transparent blur-[100px] rounded-full translate-x-[-20%]" />
          <div className="absolute inset-0 bg-gradient-to-l from-yellow-500/30 to-transparent blur-[100px] rounded-full translate-x-[20%]" />
        </div>

        <div className="relative z-10 p-6 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fd-secondary/50 border border-fd-border text-sm font-medium mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-500"></span>
            Welcome to MobiRemind Docs
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70">
            Learn and Build with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">MobiRemind</span>
          </h1>
          
          <p className="text-lg md:text-xl text-fd-muted-foreground mb-12 max-w-2xl">
            Everything you need to set up, configure, and maximize the potential of MobiRemind and our interactive Voice Agents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Overview Card */}
            <Link
              to="/docs/overview"
              className="group relative flex flex-col items-start p-8 rounded-3xl border border-fd-border bg-fd-background/50 hover:bg-fd-secondary/30 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full transition-transform duration-500 group-hover:scale-150" />
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center mb-6 shadow-inner border border-cyan-500/20">
                <Book className="size-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-cyan-500 transition-colors">
                Overview
              </h2>
              <p className="text-fd-muted-foreground mb-8 leading-relaxed">
                Dive into the core documentation, API references, and comprehensive guides for the MobiRemind platform.
              </p>
              <div className="mt-auto flex items-center gap-2 text-cyan-500 font-semibold">
                Start Reading <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Voice Agents Card */}
            <Link
              to="/docs/voice-agent"
              className="group relative flex flex-col items-start p-8 rounded-3xl border border-fd-border bg-fd-background/50 hover:bg-fd-secondary/30 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-yellow-500/50 hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)] overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full transition-transform duration-500 group-hover:scale-150" />
              <div className="h-12 w-12 rounded-2xl bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center mb-6 shadow-inner border border-yellow-500/20">
                <Mic className="size-6" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                Voice Agents
              </h2>
              <p className="text-fd-muted-foreground mb-8 leading-relaxed">
                Learn how to build, deploy, and interact with AI-driven voice agents tailored to your custom workflows.
              </p>
              <div className="mt-auto flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-semibold">
                Explore Agents <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
