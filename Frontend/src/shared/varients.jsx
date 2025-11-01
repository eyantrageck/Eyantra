export const fadeIn = (direction, amount, delay) => {
    return {
      hidden: {
        y: direction === 'up' ? amount : direction === 'down' ? -amount : 0,
        opacity: 0,
        x: direction === 'left' ? amount : direction === 'right' ? -amount : 0,
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 1.2,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        }
      }
    };
  };


  export const rotate = (direction, degrees, duration, delay) => {
    return {
      hidden: {
        rotate: direction === ' ' ? 0 : degrees, // Initial rotation
      },
      show: {
        rotate: direction === 'clockwise' ? degrees : 0, // Final rotation
        transition: {
          type: 'tween',
          duration: duration,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75], // Smooth ease effect
        },
      },
    };
  };
  
export const card = (direction, amount, delay, rotate   ) => {
    return {
      hidden: {
        y: direction === 'up' ? amount : direction === 'down' ? -amount : 0,
        x: direction === 'left' ? amount : direction === 'right' ? -amount : 0,
        rotateX: rotate,
        rotatey: rotate,
    },
    show: {
        y: 0,
        x: 0,
        rotateX: 0,
        rotatey: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 1.2,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        }
      }
    };
  };
  
