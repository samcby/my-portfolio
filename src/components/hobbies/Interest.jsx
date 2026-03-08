"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import DraggableWindow from "@/components/layout/DraggableWindow";
import { useTheme } from '@/context/ThemeContext';
import WindowContent from './WindowContent';
import { getInitialPosition, getWindowTitle } from './windowUtils';

const Interests = ({ containerRef }) => {
  const { isDarkMode } = useTheme();
  const [windows, setWindows] = useState(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0
  });
  const [isMobile, setIsMobile] = useState(false);
  const isInitializedRef = useRef(false);
  const previousDimensionsRef = useRef({ width: 0, height: 0 });
  
  // 闂冨弶濮堥崙鑺ユ殶
  const debounce = useCallback((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // 濡偓濞村妲搁崥锔胯礋缁夎濮╃拋鎯ь槵
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 閺囧瓨鏌婄€圭懓娅掔亸鍝勵嚟
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const viewportHeight = window.innerHeight;
        const navbarHeight = 64;
        const availableHeight = viewportHeight - navbarHeight;
        
        const newDimensions = {
          width: containerRef.current.offsetWidth,
          height: availableHeight
        };

        setContainerDimensions(newDimensions);
      }
    };

    const debouncedUpdateDimensions = debounce(updateDimensions, 100);
    updateDimensions();
    window.addEventListener('resize', debouncedUpdateDimensions);
    return () => window.removeEventListener('resize', debouncedUpdateDimensions);
  }, [containerRef, debounce]);

  // 婢跺嫮鎮婄粣妤€褰涙担宥囩枂閺囧瓨鏌?
  useEffect(() => {
    if (!windows || !containerDimensions.width || !containerDimensions.height) return;

    const { width: prevWidth, height: prevHeight } = previousDimensionsRef.current;
    if (prevWidth === 0 && prevHeight === 0) {
      previousDimensionsRef.current = containerDimensions;
      return;
    }

    if (prevWidth !== containerDimensions.width || prevHeight !== containerDimensions.height) {
      const scaleX = containerDimensions.width / prevWidth;
      const scaleY = containerDimensions.height / prevHeight;
      
      // 缁愭褰涙径褍鐨?- 缁夎濮╃粩?80px閿涘本顢戦棃銏㈩伂300px
      const windowWidth = window.innerWidth < 480 ? 280 : 300;
      const windowHeight = 300;

      setWindows(prevWindows => 
        prevWindows.map(win => ({
          ...win,
          position: {
            x: Math.min(Math.floor(win.position.x * scaleX), containerDimensions.width - windowWidth),
            y: Math.min(Math.floor(win.position.y * scaleY), containerDimensions.height - windowHeight)
          }
        }))
      );

      previousDimensionsRef.current = containerDimensions;
    }
  }, [containerDimensions]);

  // 閸掓繂顫愰崠鏍崶閸欙絼缍呯純?
  useEffect(() => {
    if (isInitializedRef.current || !containerDimensions.width || !containerDimensions.height) return;

    // 閺勫墽銇氶幍鈧張澶岀崶閸欙綇绱濇稉宥呭晙閸欘亜婀粔璇插З缁旑垱妯夌粈娲劥閸掑棛鐛ラ崣?
    const windowIds = ['videography', 'music', 'games', 'travel', 'Personal Media', 'movie', 'volunteer'];
    
    setWindows(
      windowIds.map((id, index) => ({
        ...getInitialPosition(index, windowIds.length, containerDimensions),
        id,
        // 缁夎濮╃粩顖濐啎缂冾喛绶濈亸蹇曟畱閸掓繂顫愰柅鐔峰閿涘苯鍣虹亸鎴犵崶閸欙絿些閸?
        velocity: {
          x: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5),
          y: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5)
        }
      }))
    );
    
    isInitializedRef.current = true;
    previousDimensionsRef.current = containerDimensions;
  }, [containerDimensions, isMobile]);

  // 婢跺嫮鎮婄粣妤€褰涚粔璇插З閸滃瞼顫幘?
  useEffect(() => {
    if (!windows || !containerDimensions.width || !containerDimensions.height) return;

    let animationFrameId;
    const windowWidth = window.innerWidth < 480 ? 280 : 300;
    const windowHeight = 300;

    const updatePositions = () => {
      // 閸︺劎些閸斻劏顔曟径鍥︾瑐閸戝繑鍙冮崝銊ф暰
      const speedFactor = isMobile ? 0.6 : 1;
      
      setWindows(prevWindows => 
        prevWindows.map(win => {
          if (win.isDragging || !win.isVisible) return win;

          // 鎼存梻鏁ら柅鐔峰閸ョ姴鐡?
          const adjustedVelocityX = win.velocity.x * speedFactor;
          const adjustedVelocityY = win.velocity.y * speedFactor;

          // 鐠侊紕鐣荤粣妤€褰涢惃鍕煀娴ｅ秶鐤嗛敍鍫濇磽娑擃亣绔熼悾宀嬬礆
          const newLeft = win.position.x + adjustedVelocityX;
          const newRight = newLeft + windowWidth;
          const newTop = win.position.y + adjustedVelocityY;
          const newBottom = newTop + windowHeight;

          let newVelocityX = win.velocity.x;
          let newVelocityY = win.velocity.y;

          // 濮樻潙閽╅弬鐟版倻閻ㄥ嫮顫幘鐐搭梾濞村绱欏锕€褰告潏鍦櫕閿?
          if (newLeft <= 0 || newRight >= containerDimensions.width) {
            newVelocityX = -win.velocity.x;
          }
          
          // 閸ㄥ倻娲块弬鐟版倻閻ㄥ嫮顫幘鐐搭梾濞村绱欐稉濠佺瑓鏉堝湱鏅敍?
          // navbar妤傛ê瀹虫稉?4px閿涘畺ooter padding娑?6px
          const minTop = 0; // navbar閻ㄥ嫪绗呮潏鍦櫕鐎电懓绨茬€圭懓娅掗惃?娴ｅ秶鐤?
          const maxBottom = containerDimensions.height - 16; // 閸戝繐骞揻ooter padding
          if (newTop <= minTop || newBottom >= maxBottom) {
            newVelocityY = -win.velocity.y;
          }

          // 绾喕绻氱粣妤€褰涚€瑰苯鍙忛崷銊ュ讲鐟欏棗灏崺鐔峰敶
          const boundedX = Math.max(0, Math.min(newLeft, containerDimensions.width - windowWidth));
          const boundedY = Math.max(minTop, Math.min(newTop, maxBottom - windowHeight));

          return {
            ...win,
            position: {
              x: boundedX,
              y: boundedY
            },
            velocity: {
              x: newVelocityX,
              y: newVelocityY
            }
          };
        })
      );

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrameId);
  }, [windows, containerDimensions, isMobile]);

  const handleDragStart = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isDragging: true } : win
      )
    );
  }, []);

  const handleDragStop = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isDragging: false } : win
      )
    );
  }, []);

  const handleDrag = useCallback((id, data) => {
    // 閺嶈宓佺仦蹇撶鐏忓搫顕涵顔肩暰缁愭褰涙径褍鐨?
    const isVerySmall = typeof window !== 'undefined' && window.innerWidth < 480;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const windowWidth = isVerySmall ? 200 : isMobile ? 240 : 300;
    const windowHeight = 300;
    
    const maxBottom = containerDimensions.height - 16; // 閸戝繐骞揻ooter padding
    
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id
          ? {
              ...win,
              position: {
                x: Math.max(0, Math.min(data.x, containerDimensions.width - windowWidth)),
                y: Math.max(0, Math.min(data.y, maxBottom - windowHeight))
              }
            }
          : win
      )
    );
  }, [containerDimensions]);

  const handleClose = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isVisible: false } : win
      )
    );
  }, []);

  // 濞ｈ濮為柌宥囩枂閸旂喕鍏橀敍宀冾唨閹碘偓閺堝鐛ラ崣锝夊櫢閺傜増妯夌粈?
  const handleReset = useCallback(() => {
    isInitializedRef.current = false;
    setWindows(null);
  }, []);

  if (!windows) return null;

  return (
    <div 
      className={`
        w-full 
        h-full
        pb-16 
        relative 
        transition-colors 
        duration-300
        ${isDarkMode ? 'bg-[#002b36]' : 'bg-white'}
      `}
      style={{
        height: `${containerDimensions.height}px`,
      }}
    >
      {/* 缁夎濮╃粩顖涘潑閸旂娀鍣哥純顔藉瘻闁?*/}
      {isMobile && (
        <button 
          onClick={handleReset}
          className={`
            absolute top-2 right-2 z-50
            px-3 py-1 
            text-xs
            rounded-md
            ${isDarkMode 
              ? 'bg-[#073642] text-[#93a1a1] hover:bg-[#114454]' 
              : 'bg-[#f8fbff] text-[#586e75] hover:bg-[#eef4fb]'
            }
            transition-colors duration-200
          `}
        >
          Reset Windows
        </button>
      )}
      
      {windows.map((window) => (
        window.isVisible && (
          <DraggableWindow
            key={window.id}
            title={getWindowTitle(window.id)}
            defaultPosition={window.position}
            bounds="parent"
            onStart={() => handleDragStart(window.id)}
            onStop={() => handleDragStop(window.id)}
            onDrag={(e, data) => handleDrag(window.id, data)}
            position={window.position}
            onClose={() => handleClose(window.id)}
            className={`${isDarkMode ? 'bg-[#073642] text-[#93a1a1]' : 'bg-[#f8fbff] text-[#586e75] border border-[#d8e2eb]'}`}
          >
            <WindowContent id={window.id} />
          </DraggableWindow>
        )
      ))}
    </div>
  );
};

export default Interests;
