
import React, { useEffect, useRef, useState } from 'react';
import { useKeyPress } from '@/hooks/useKeyPress';

interface FarmPlot {
  id: string;
  x: number;
  y: number;
  state: 'ready' | 'empty' | 'harvested';
}

export const ContainerFarmGame: React.FC = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  const [score, setScore] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 10, y: 350 });
  const [plots, setPlots] = useState<FarmPlot[]>([
    { id: 'plot1', x: 80, y: 50, state: 'ready' },
    { id: 'plot2', x: 150, y: 50, state: 'ready' },
    { id: 'plot3', x: 400, y: 50, state: 'ready' },
    { id: 'plot4', x: 250, y: 150, state: 'ready' },
    { id: 'plot5', x: 500, y: 150, state: 'ready' },
    { id: 'plot6', x: 100, y: 280, state: 'ready' },
    { id: 'plot7', x: 350, y: 280, state: 'ready' },
  ]);

  const playerSpeed = 10;
  const interactionDistance = 45;
  const regrowthTime = 5000;

  // Set up key press handlers
  const upPressed = useKeyPress('ArrowUp');
  const downPressed = useKeyPress('ArrowDown');
  const leftPressed = useKeyPress('ArrowLeft');
  const rightPressed = useKeyPress('ArrowRight');
  const spacePressed = useKeyPress(' ');

  // Handle player movement
  useEffect(() => {
    if (!gameAreaRef.current) return;
    
    const gameArea = gameAreaRef.current;
    const gameWidth = gameArea.offsetWidth;
    const gameHeight = gameArea.offsetHeight;
    const playerWidth = 30; // Match CSS
    const playerHeight = 30; // Match CSS
    
    const movePlayer = () => {
      let newX = playerPos.x;
      let newY = playerPos.y;
      
      if (upPressed) newY = Math.max(0, newY - playerSpeed);
      if (downPressed) newY = Math.min(gameHeight - playerHeight, newY + playerSpeed);
      if (leftPressed) newX = Math.max(0, newX - playerSpeed);
      if (rightPressed) newX = Math.min(gameWidth - playerWidth, newX + playerSpeed);
      
      setPlayerPos({ x: newX, y: newY });
    };
    
    const movementInterval = setInterval(movePlayer, 30);
    return () => clearInterval(movementInterval);
  }, [upPressed, downPressed, leftPressed, rightPressed, playerPos]);

  // Handle harvesting with space bar
  useEffect(() => {
    if (spacePressed) {
      checkForHarvest();
    }
  }, [spacePressed]);
  
  const checkForHarvest = () => {
    if (!playerRef.current) return;
    
    const playerRect = playerRef.current.getBoundingClientRect();
    const playerCenterX = playerRect.left + playerRect.width / 2;
    const playerCenterY = playerRect.top + playerRect.height / 2;
    
    plots.forEach((plot, index) => {
      if (plot.state === 'ready') {
        // Get the plot element by its data-id
        const plotElement = document.querySelector(`[data-id="${plot.id}"]`);
        if (!plotElement) return;
        
        const plotRect = plotElement.getBoundingClientRect();
        const plotCenterX = plotRect.left + plotRect.width / 2;
        const plotCenterY = plotRect.top + plotRect.height / 2;
        
        // Calculate distance between centers
        const distance = Math.sqrt(
          Math.pow(playerCenterX - plotCenterX, 2) +
          Math.pow(playerCenterY - plotCenterY, 2)
        );
        
        if (distance < interactionDistance) {
          harvestPlot(index);
        }
      }
    });
  };
  
  const harvestPlot = (plotIndex: number) => {
    const newPlots = [...plots];
    newPlots[plotIndex].state = 'harvested';
    setPlots(newPlots);
    setScore(prev => prev + 1);
    
    // Set regrowth timer
    setTimeout(() => {
      const regrowPlots = [...plots];
      regrowPlots[plotIndex].state = 'ready';
      setPlots(regrowPlots);
    }, regrowthTime);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">Mini Container Farm</h2>
      <div 
        ref={gameAreaRef}
        className="w-[600px] h-[400px] border-3 border-solid border-gray-600 bg-[#e0d8c4] relative overflow-hidden shadow-md"
        id="game-area"
      >
        <div 
          ref={playerRef}
          id="player"
          className="w-[30px] h-[30px] bg-blue-600 rounded-full absolute flex justify-center items-center text-lg text-white"
          style={{ 
            left: `${playerPos.x}px`, 
            top: `${playerPos.y}px`,
            transition: 'left 0.1s linear, top 0.1s linear'
          }}
        >
          🧑‍🌾
        </div>
        
        {plots.map((plot) => (
          <div 
            key={plot.id}
            data-id={plot.id}
            className={`farm-plot w-[40px] h-[40px] bg-[#8b4513] border-2 border-solid border-[#5a2d0c] absolute flex justify-center items-center text-2xl ${plot.state}`}
            style={{ 
              top: `${plot.y}px`, 
              left: `${plot.x}px` 
            }}
          >
            {plot.state === 'ready' && (
              <span className="animate-pulse">🌱</span>
            )}
            {plot.state === 'harvested' && (
              <span className="opacity-60">⏳</span>
            )}
          </div>
        ))}
        
        <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded text-sm border border-gray-300">
          Harvested: <span id="score">{score}</span>
        </div>
      </div>
      <div className="text-center mt-2 text-sm text-gray-700">
        Use Arrow Keys to move. Press SPACE near 🌱 to harvest.
      </div>
    </div>
  );
};
