import { useCallback, useEffect, useRef, useState } from "react";

import { blockSize, boardSize } from "./Constants";
import DrawGrid from "./Draw/DrawGrid";
import DrawSnake from "./Draw/DrawSnake";
import DrawFood from "./Draw/DrawFood";

function randomIntFromInterval(min: number, max: number) {
	return Math.ceil(Math.floor(Math.random() * (max - min + 1) + min) / blockSize) * blockSize;
}

function calculateNewSnakePosition(snakePosition: coordinates[], snakeDirection: direction, scorePending?: boolean): coordinates[] {
	// Recalculate the snake’s position
	let newCoordinates = [...snakePosition];
	let firstPoint = { ...newCoordinates[0] };

	switch(snakeDirection) {
		case "right":
			firstPoint.x = snakePosition[0].x + blockSize;
		break;

		case "down":
			firstPoint.y = snakePosition[0].y + blockSize;
		break;

		case "left":
			firstPoint.x = snakePosition[0].x - blockSize;
		break;

		case "up":
			firstPoint.y = snakePosition[0].y - blockSize;
		break;
	}

	newCoordinates.unshift(firstPoint);

	if(!scorePending) {
		newCoordinates.pop();
	}

	return newCoordinates;
}

function calculateFood(snakePosition: coordinates[]): coordinates {
	const x = randomIntFromInterval(snakePosition[0].x, boardSize);
	const y = randomIntFromInterval(snakePosition[0].y, boardSize);

	return { x: x, y: y };
}

function didEatFood(snakePosition: coordinates[], foodPosition: coordinates) {
	if(snakePosition[0].x === foodPosition.x && snakePosition[0].y === foodPosition.y) {
		return true;
	}

	return false;
}

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ctx = useRef<CanvasRenderingContext2D | null>(null);

	const [snakePosition, setSnakePosition] = useState([{ x: boardSize / 2, y: boardSize / 2 }]);
	const [snakeDirection, setSnakeDirection] = useState<direction>("right");
	const [foodPosition, setFoodPosition] = useState<coordinates>();
	const [score, setScore] = useState(0);

	const frameRate = useRef(100);
	const pendingScore = useRef(false);

	let frameCount = useRef(0);

	const draw = useCallback((ctx: CanvasRenderingContext2D, frameCount: number) => {
		console.log(`Drawing frame ${frameCount}`);

		DrawGrid(ctx);
		DrawSnake(ctx, snakePosition);

		if(foodPosition) {
			DrawFood(ctx, foodPosition);
		}
	}, [snakePosition, foodPosition]);

	function onChangeDirection(event: KeyboardEvent) {
		switch(event.key) {
			case "ArrowRight":
				setSnakeDirection("right");
			break;

			case "ArrowDown":
				setSnakeDirection("down");
			break;

			case "ArrowLeft":
				setSnakeDirection("left");
			break;

			case "ArrowUp":
				setSnakeDirection("up");
			break;
		}
	}

	function increaseScore() {
		setScore(score + 1);
	}

	function increaseSnakeSize() {
		pendingScore.current = true;
	}

	useEffect(() => {
		window.addEventListener("keydown", onChangeDirection);
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const canvas = canvasRef.current;

			if(canvas) {
				canvas.height = boardSize;
				canvas.width = boardSize;

				ctx.current = canvas.getContext("2d");

				if(ctx.current) {
					setSnakePosition(calculateNewSnakePosition(snakePosition, snakeDirection, pendingScore.current));
					pendingScore.current = false;

					if(!foodPosition) {
						setFoodPosition(calculateFood(snakePosition));
					}

					if(foodPosition && didEatFood(snakePosition, foodPosition)) {
						setFoodPosition(undefined);
						increaseScore();
						increaseSnakeSize();
						setFoodPosition(calculateFood(snakePosition));
					}

					draw(ctx.current!, frameCount.current);
					frameCount.current++;
				}
			}
		}, frameRate.current);

		return () => {
			clearInterval(intervalId);
		}
	}, [draw, snakeDirection, snakePosition]);

	return (
		<>
			<p>{score}</p>
			<canvas ref={canvasRef}/>;
		</>
	);
}

export default App;
