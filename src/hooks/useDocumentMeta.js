import { useEffect } from 'preact/hooks';

const defaultMeta = {
  title: 'Chinese Name Generator - Get Your Perfect Chinese Name',
  description: 'Generate your personalized Chinese name based on your Western name, gender, and birthdate. Discover authentic Chinese names with pronunciation, meaning, zodiac sign and five elements analysis.',
  ogTitle: 'Chinese Name Generator - Get Your Perfect Chinese Name',
  ogDescription: 'Generate authentic Chinese names with meanings, pronunciation guides, zodiac sign and five elements analysis. Get your perfect Chinese identity in seconds!'
};

const routeMeta = {
  '/': defaultMeta,
  '/name': {
    title: 'Your Chinese Name Result | Chinese Name Generator',
    description: 'See your personalized Chinese name with pronunciation, meaning, Chinese zodiac sign and five elements analysis.',
    ogTitle: 'I Got My Chinese Name! | Chinese Name Generator',
    ogDescription: 'Discover your authentic Chinese name based on your birthdate and personality.'
  }
};

function updateMetaTag(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function updateMetaName(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function useDocumentMeta(pathname) {
  useEffect(() => {
    const meta = routeMeta[pathname] || defaultMeta;

    if (meta.title && document.title !== meta.title) {
      document.title = meta.title;
    }

    if (meta.description) {
      updateMetaName('description', meta.description);
    }

    if (meta.ogTitle) {
      updateMetaTag('og:title', meta.ogTitle);
    }

    if (meta.ogDescription) {
      updateMetaTag('og:description', meta.ogDescription);
    }

    // Update canonical
    const canonicalUrl = `https://chinese-name.m9ai.work${pathname === '/' ? '' : pathname}`;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Update og:url
    updateMetaTag('og:url', canonicalUrl);
  }, [pathname]);
}
