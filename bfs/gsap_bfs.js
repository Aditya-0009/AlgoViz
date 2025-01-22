// gsap_bfs.js

// Import GSAP library
import gsap from 'gsap';

// Function to animate the BFS visualization elements
export function animateNode(nodeElement) {
    gsap.to(nodeElement, {
        duration: 0.5,
        scale: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(nodeElement, {
                duration: 0.5,
                scale: 1,
                ease: "power2.inOut"
            });
        }
    });
}

export function animateEdge(edgeElement) {
    gsap.fromTo(edgeElement, {
        stroke: 'black',
        strokeWidth: 2
    }, {
        stroke: 'red',
        strokeWidth: 5,
        duration: 1,
        onComplete: () => {
            gsap.to(edgeElement, {
                stroke: 'black',
                strokeWidth: 2,
                duration: 0.5
            });
        }
    });
}
