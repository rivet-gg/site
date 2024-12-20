import { ImageResponse } from 'next/og';

import fs from 'node:fs/promises';
import path from 'node:path';
import { FontWeight, Font } from 'next/dist/compiled/@vercel/og/satori';
import { iconPack } from '@rivet-gg/icons';
import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import { NextRequest } from 'next/server';

const Icon = ({ icon, size, style }) => {
  const [width, height, , , path] = icon.icon;

  const ratio = width / height;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: size * ratio,
        height: size,
        ...style
      }}>
      <path fill='currentColor' d={path} />
    </svg>
  );
};

export const dynamic = 'force-static';
export async function GET(req: NextRequest, { params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return new Response(`Unknown module`, {
      status: 404
    });
  }

  const icon = Object.entries(iconPack).find(([, { iconName }]) => iconName === mod.meta.config.icon)?.[1];

  const { meta } = mod;
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          // background: '#120f0f',
          background: 'linear-gradient(0deg, rgba(18,15,15,1) 0%, rgba(12,10,9,1) 75%)',
          color: 'white',
          fontFamily: 'OpenSans',
          width: '100%',
          height: '100%',
          alignItems: 'flex-start',
          paddingLeft: 64,
          paddingRight: 64,
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 48,
          borderBottom: '8px solid #ff4f00'
        }}>
        <span style={{ fontWeight: 'bold', fontSize: 48 }}>Backend Module</span>
        <div
          style={{
            fontSize: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32
          }}>
          <Icon style={{ color: '#ff4f00' }} icon={icon} size={125} />
          <div style={{ fontWeight: 'bold' }}>{meta.config.name}</div>
        </div>
        <span style={{ fontSize: 48 }}>{meta.config.description}</span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: await loadFonts()
    }
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}

async function loadFonts(): Promise<Font[]> {
  const fontsPath = path.join(process.cwd(), 'opengraph-image-fonts');
  const files = await fs.readdir(fontsPath);
  const fonts = files.filter(file => file.endsWith('.ttf'));

  const map = new Map<string, Map<number, ArrayBufferLike>>();

  for (const font of fonts) {
    const buffer = await fs.readFile(path.join(fontsPath, font));
    const fontSrc = Uint8Array.from(buffer).buffer;

    const [name, weight] = font.split('.')[0].split('-');
    if (!map.has(name)) {
      map.set(name, new Map());
    }

    map.get(name)?.set(Number(weight), fontSrc);
  }

  const out: Font[] = [];
  for (const [name, weights] of map) {
    for (const weight of weights.keys()) {
      out.push({
        name,
        weight: weight as FontWeight,
        data: weights.get(weight)!
      });
    }
  }

  return out;
}

function Logo() {
  return (
    <svg width='204' height='68' viewBox='0 0 204 68' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='3' y='3' width='62' height='62' rx='17.55' stroke='white' stroke-width='6' />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M28.9979 19.7671C28.9979 19.3436 28.6541 19 28.2308 19H22.4809C20.5597 19 19 20.5597 19 22.4807V45.5125C19 47.4336 20.5597 48.9935 22.4809 48.9935H28.2308C28.6541 48.9935 28.9979 48.6496 28.9979 48.2263V19.7671ZM45.6293 38.7439C44.7861 37.231 42.8732 36.0028 41.3604 36.0028H32.5577C32.0922 36.0028 31.9249 36.3807 32.1843 36.8462L37.4298 46.2586C38.273 47.7717 40.1858 49 41.6987 49H50.5012C50.9667 49 51.1342 48.6221 50.8745 48.1563L45.6293 38.7439ZM45.9963 25.9983C45.9963 22.1359 42.8604 19 38.9977 19H32.8227C32.3682 19 31.9994 19.3688 31.9994 19.8233V32.1734C31.9994 32.6278 32.3682 32.9969 32.8227 32.9969H38.9977C42.8604 32.9969 45.9963 29.861 45.9963 25.9983Z'
        fill='white'
      />
      <path
        d='M197.177 18.564C197.485 18.564 197.691 18.7698 197.691 19.0784V25.8685C197.691 26.1257 197.845 26.28 198.103 26.28H202.372C202.681 26.28 202.886 26.4858 202.886 26.7944V31.2697C202.886 31.5783 202.681 31.7841 202.372 31.7841H198.103C197.845 31.7841 197.691 31.9384 197.691 32.1956V51.4856C197.691 51.7942 197.485 52 197.177 52H191.415C191.107 52 190.901 51.7942 190.901 51.4856V32.1956C190.901 31.9384 190.747 31.7841 190.489 31.7841H185.808C185.5 31.7841 185.294 31.5783 185.294 31.2697V26.7944C185.294 26.4858 185.5 26.28 185.808 26.28H190.489C190.747 26.28 190.901 26.1257 190.901 25.8685V19.0784C190.901 18.7698 191.107 18.564 191.415 18.564H197.177Z'
        fill='white'
      />
      <path
        d='M172.602 52.6173C165.143 52.6173 159.021 46.4959 159.021 38.8828C159.021 31.3211 164.628 25.457 172.036 25.457C178.311 25.457 183.558 30.0866 184.021 35.6421C184.073 35.8993 183.918 36.105 183.713 36.2594L168.281 45.2614C168.023 45.4157 167.972 45.6729 168.229 45.8786C169.567 47.0103 171.213 47.2675 172.602 47.2675C175.791 47.2675 177.386 45.7758 178.723 43.5638C178.877 43.3066 179.083 43.2038 179.34 43.2552L183.713 44.0268C184.021 44.0782 184.227 44.2326 184.176 44.4383C183.25 48.1934 179.186 52.6173 172.602 52.6173ZM165.503 40.1174L165.606 40.426C165.709 40.7346 165.966 40.7861 166.172 40.6318L176.717 34.1503C176.923 33.996 177.025 33.8417 176.871 33.5845C175.945 32.0413 174.042 31.0639 171.676 31.3211C168.229 31.7326 164.114 35.8993 165.503 40.1174Z'
        fill='white'
      />
      <path
        d='M132.755 26.8973C132.601 26.5372 132.806 26.28 133.166 26.28H139.288C139.545 26.28 139.751 26.3829 139.854 26.6915L145.718 42.2264C145.821 42.5865 146.129 42.5865 146.232 42.2264L152.148 26.6915C152.251 26.3829 152.456 26.28 152.714 26.28H158.835C159.195 26.28 159.401 26.5372 159.247 26.8973L149.113 51.5885C149.01 51.8971 148.804 52 148.547 52H143.403C143.146 52 142.94 51.8971 142.837 51.5885L132.755 26.8973Z'
        fill='white'
      />
      <path
        d='M123.506 52C123.198 52 122.992 51.7942 122.992 51.4856V26.7944C122.992 26.4858 123.198 26.28 123.506 26.28H129.267C129.576 26.28 129.782 26.4858 129.782 26.7944V51.4856C129.782 51.7942 129.576 52 129.267 52H123.506ZM122.375 19.7986C122.375 17.5352 124.175 15.7348 126.387 15.7348C128.65 15.7348 130.399 17.5352 130.399 19.7986C130.399 22.0105 128.599 23.8109 126.387 23.8109C124.175 23.8109 122.375 22.0105 122.375 19.7986Z'
        fill='white'
      />
      <path
        d='M105.23 15.992C112.895 15.992 118.296 20.8274 118.296 28.4405C118.296 33.1215 116.393 36.568 112.74 38.5742C112.483 38.7285 112.483 38.9342 112.74 39.14C116.855 41.9692 118.604 47.2675 118.759 51.4856C118.759 51.7942 118.553 52 118.244 52H112.997C112.689 52 112.483 51.8457 112.483 51.4856C112.277 47.6276 109.602 41.3519 102.864 40.426C102.349 40.426 101.784 40.3746 101.218 40.3746C100.961 40.3231 100.806 40.4774 100.806 40.7346V51.4856C100.806 51.7942 100.6 52 100.292 52H94.5305C94.2219 52 94.0161 51.7942 94.0161 51.4856V16.5064C94.0161 16.1978 94.2219 15.992 94.5305 15.992H105.23ZM100.806 33.996C100.806 34.2532 100.961 34.4075 101.218 34.4075H105.076C114.283 34.4075 114.283 22.2162 105.539 22.2162H101.218C100.961 22.2162 100.806 22.3706 100.806 22.6278V33.996Z'
        fill='white'
      />
    </svg>
  );
}
