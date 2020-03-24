import React, { useState, useEffect, Fragment } from "react";
import "./Navigation.css";


const useNavigation = (lastIdx) => {
    const [path, setPath] = useState(window.location.pathname);
    const currentIndex = parseInt(path.replace("/", ""))
    const isHome = () => path === "/";

    useEffect(() => {
        if (path && path !== window.location.pathname) {
            window.location.pathname = path;
        }
    }, [path])

    function prevRelease() {
        if (isHome()) {
            return "/" + lastIdx.toString()
        } else if (currentIndex == 1) {
            return "/";
        } else {
            return "/" + (currentIndex - 1).toString();
        }
    };

    function nextRelease() {
        if (currentIndex == lastIdx.toString()) {
            return "/";
        } else if (isHome()) {
            return "/1";
        } else {
            return "/" + (currentIndex + 1).toString();
        }
    };

    return {
        goToPrev: () => setPath(prevRelease()),
        goToNext: () => setPath(nextRelease()),
    }
}

function NextNavigationArrow({ color, lastIdx }) {
    const { goToNext } = useNavigation(lastIdx);
    return (
        <div className="arrow arrow-next">
            <svg
                viewBox="0 0 25 25"
                width="100%"
                height="100%"
                onClick={() => goToNext()}
            >
                <g className="arrow-path" fill={color}>
                    <path d="M19.71,15.29l-6-6a1,1,0,0,0-1.42,1.42L17.59,16l-5.3,5.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l6-6A1,1,0,0,0,19.71,15.29Z" />
                </g>
            </svg>
        </div>
    );
}


function PrevNavigationArrow({ color, lastIdx }) {
    const { goToPrev } = useNavigation(lastIdx);
    return (
        <div className="arrow arrow-prev">
            <svg
                viewBox="0 0 25 25"
                width="100%"
                height="100%"
                onClick={() => goToPrev()}
            >
                <g className="arrow-path" fill={color}>
                    <path d="M14.41,16l5.3-5.29a1,1,0,0,0-1.42-1.42l-6,6a1,1,0,0,0,0,1.42l6,6a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
                </g>
            </svg>
        </div>
    );
}

export default function Navigation({ ...props }) {
    
    return (
        <>
            <PrevNavigationArrow {...props} />
            <NextNavigationArrow {...props} />
        </>
    );
}
