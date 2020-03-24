import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import './Header.css';

export default function Header({ content }) {

  const [curContent, setCurContent] = useState();

  useEffect(() => {
    if (!content) return;
    setCurContent(content[window.location.pathname]);
  }, [content])

  return (
    <div>
      {curContent &&
        <Logo fillColor={curContent.colors.logo} />
      }
    </div>
  );
}