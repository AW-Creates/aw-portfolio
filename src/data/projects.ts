export interface ProjectData {
    id: string;
    title: string;
    category: string;
    description: string;
    role: string;
    timeline: string;
    techStack: string[];
    liveUrl: string;
    heroImage: string;
    gallery: {
        url: string;
        span: 'full' | 'half';
    }[];
}

export const projectsData: Record<string, ProjectData> = {
    '01': {
        id: '01',
        title: 'Aura Studio',
        category: 'Motion & 3D / Brand Identity',
        description: 'A dark, cinematic 3D portfolio experience built for a motion designer. It leverages heavy Framer Motion scroll animations, WebGL canvas sequences, and brutalist typography to create an immersive digital identity.',
        role: 'Frontend & 3D Web Dev',
        timeline: '3 Weeks',
        techStack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
        liveUrl: 'https://github.com/AW-Creates/AuraStudio',
        heroImage: 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png',
        gallery: [
            { url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1280&q=80', span: 'full' },
            { url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1280&q=80', span: 'half' },
            { url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1280&q=80', span: 'half' }
        ]
    },
    '02': {
        id: '02',
        title: 'Spectra Collective',
        category: 'Cinematic Web / Agency Landing',
        description: 'A completely custom, ultra-premium landing experience built for a global consortium of digital architects and cinematographers. It heavily features native WebGL noise filters, Framer Motion text-pull reveals, and fluid CSS grid masonry.',
        role: 'Creative Developer',
        timeline: '1 Month',
        techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
        liveUrl: 'http://localhost:5175',
        heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1280&q=80',
        gallery: [
            { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1280&q=80', span: 'full' },
            { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1280&q=80', span: 'full' }
        ]
    },
    '03': {
        id: '03',
        title: 'Quantum Dashboard',
        category: 'Fintech Interface',
        description: 'A high-performance fintech dashboard designed to process millions of real-time trading data points. The UI focuses on clarity, rapid data assimilation, and low-latency rendering.',
        role: 'UX/UI Designer',
        timeline: '6 Weeks',
        techStack: ['React', 'D3.js', 'Tailwind', 'Zustand'],
        liveUrl: '#',
        heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1280&q=80',
        gallery: [
            { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1280&q=80', span: 'full' },
            { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1280&q=80', span: 'half' },
            { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1280&q=80', span: 'half' }
        ]
    },
    '04': {
        id: '04',
        title: 'Echelon',
        category: 'E-Commerce Scrollytelling',
        description: 'A luxury e-commerce experience blending editorial storytelling with seamless purchasing pathways. The site utilizes dynamic loading and heavy visual aesthetics to sell premium goods.',
        role: 'Full Stack Dev',
        timeline: '1 Month',
        techStack: ['Remix', 'Shopify', 'Framer Motion', 'Tailwind'],
        liveUrl: '#',
        heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1280&q=80',
        gallery: [
            { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1280&q=80', span: 'full' },
            { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1280&q=80', span: 'full' }
        ]
    }
}
