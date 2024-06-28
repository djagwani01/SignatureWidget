import React, { useEffect, useRef, useState } from 'react';
import './style.css'

const BasicCanvas = () => {
    const canvasRef = useRef(null);
    const canvasContext = useRef(null);
    const [isDrwaing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 500;
        canvas.height = 400;

        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.width = 3;
        canvasContext.current = context;
    }, [])

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent
        canvasContext.current.beginPath();
        canvasContext.current.moveTo(offsetX, offsetY)
        canvasContext.current.lineTo(offsetX, offsetY)
        canvasContext.current.stroke();
        setIsDrawing(true);
        nativeEvent.preventDefault();
    }

    const draw = ({nativeEvent}) => {
        if(!isDrwaing){
            return
        }
        const {offsetX, offsetY} = nativeEvent
        canvasContext.current.lineTo(offsetX, offsetY)
        canvasContext.current.stroke();
        nativeEvent.preventDefault();

    }

    const stopDrawing = ({nativeEvent}) => {
        canvasContext.current.closePath();
        setIsDrawing(false);
    }

    return (
        <canvas 
            ref={canvasRef} 
            className='container'
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
        >
            
        </canvas>
    )
}

export default BasicCanvas