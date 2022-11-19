import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const seedStashes: Prisma.StashCreateInput[] = [
  {
    url: "https://github.com/jjenzz/figma-remix",
    title: "GitHub - jjenzz/figma-remix",
    description: "Figma Remix",
    image: undefined,
    tags: undefined,
    body: "Figma Remix",
    author: {
      connectOrCreate: {
        where: {
          email: "contact@kennyelshoff.com",
        },
        create: {
          email: "contact@kennyelshoff.com",
        },
      },
    },
    mdxBody:
      'var Component=(()=>{var x=Object.create;var c=Object.defineProperty;var j=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var _=Object.getPrototypeOf,d=Object.prototype.hasOwnProperty;var f=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),g=(n,t)=>{for(var e in t)c(n,e,{get:t[e],enumerable:!0})},i=(n,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of p(t))!d.call(n,o)&&o!==e&&c(n,o,{get:()=>t[o],enumerable:!(s=j(t,o))||s.enumerable});return n};var l=(n,t,e)=>(e=n!=null?x(_(n)):{},i(t||!n||!n.__esModule?c(e,"default",{value:n,enumerable:!0}):e,n)),M=n=>i(c({},"__esModule",{value:!0}),n);var m=f((O,a)=>{a.exports=_jsx_runtime});var C={};g(C,{default:()=>h});var r=l(m());function u(n){let t=Object.assign({p:"p"},n.components);return(0,r.jsx)(t.p,{children:"Figma Remix"})}function b(n={}){let{wrapper:t}=n.components||{};return t?(0,r.jsx)(t,Object.assign({},n,{children:(0,r.jsx)(u,n)})):u(n)}var h=b;return M(C);})();\n' +
      ";return Component;",
    host: "github.com",
    slug: "git-hub-jjenzz-figma-remix",
  },
  {
    url: "https://www.prisma.io/docs/concepts/components/prisma-schema/data-model",
    host: "www.prisma.io",
    title: "Stash 1",
    slug: "stash-1",
    description: "Stash 1 description",
    body: "Stash 1 body",
    author: {
      connectOrCreate: {
        where: {
          email: "contact@kennyelshoff.com",
        },
        create: {
          email: "contact@kennyelshoff.com",
        },
      },
    },
    tags: {
      connectOrCreate: [
        {
          where: {
            name: "prisma",
          },
          create: {
            name: "prisma",
            slug: "prisma",
          },
        },
      ],
    },
  },
  {
    url: "https://www.clickondetroit.com/",
    host: "www.clickondetroit.com",
    title: "Stash 2",
    slug: "stash-2",
    description: "Stash 2 description",
    body: "Stash 2 body",
    author: {
      connectOrCreate: {
        where: {
          email: "contact@kennyelshoff.com",
        },
        create: {
          email: "contact@kennyelshoff.com",
        },
      },
    },
    tags: {
      connectOrCreate: [
        {
          where: {
            name: "prisma",
          },
          create: {
            name: "prisma",
            slug: "prisma",
          },
        },
      ],
    },
  },
  {
    url: "https://kennyelshoff.com/",
    host: "kennyelshoff.com",
    title: "Stash 3",
    slug: "stash-3",
    description: "Stash 3 description",
    body: "Stash 3 body",
    author: {
      connectOrCreate: {
        where: {
          email: "contact@kennyelshoff.com",
        },
        create: {
          email: "contact@kennyelshoff.com",
        },
      },
    },
    tags: {
      connectOrCreate: [
        {
          where: {
            name: "prisma",
          },
          create: {
            name: "prisma",
            slug: "prisma",
          },
        },
      ],
    },
  },
];

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    seedStashes.map(async (stash) => {
      await prisma.stash
        .create({
          data: stash,
          include: {
            author: true,
          },
        })
        .catch((error) => {
          console.log("Error creating stash: ", { stash, error });
        });
      console.log(`Stash ${stash.url} created`);
    })
  );

  console.log(`Seed complete`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
