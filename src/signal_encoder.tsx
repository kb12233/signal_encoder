'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const EncodingTechnique = ({ title, signal }: { title: string, signal: number[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    drawSignal()
    window.addEventListener('resize', drawSignal)
    return () => window.removeEventListener('resize', drawSignal)
  }, [signal])

  const drawSignal = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const parentWidth = canvas.parentElement?.clientWidth || 400
        canvas.width = parentWidth
        canvas.height = 100
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        const stepSize = canvas.width / signal.length
        for (let i = 0; i < signal.length; i++) {
          const x = i * stepSize
          const y = canvas.height / 2 - signal[i] * (canvas.height / 4)
          ctx.lineTo(x, y)
          ctx.lineTo(x + stepSize, y)
        }

        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }
  }

  return (
    <div className="mb-4 w-full">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="w-full overflow-x-auto">
        <canvas ref={canvasRef} height="100" className="border border-gray-300 w-full"></canvas>
      </div>
    </div>
  )
}

export default function DigitalSignalEncoder() {
  const [binaryInput, setBinaryInput] = useState('')
  const [encodedSignals, setEncodedSignals] = useState<{ [key: string]: number[] }>({})

  const encodingTechniques = {
    'NRZ-L': (binary: string) => binary.split('').map(bit => bit === '1' ? 1 : -1),
    'NRZ-I': (binary: string) => {
      let signal = []
      let currentLevel = -1
      for (let bit of binary) {
        if (bit === '1') currentLevel *= -1
        signal.push(currentLevel)
      }
      return signal
    },
    'Bipolar AMI': (binary: string) => {
      let signal = []
      let lastOne = 1
      for (let bit of binary) {
        if (bit === '0') signal.push(0)
        else {
          signal.push(lastOne)
          lastOne *= -1
        }
      }
      return signal
    },
    'Pseudoternary': (binary: string) => {
      let signal = []
      let lastZero = 1
      for (let bit of binary) {
        if (bit === '1') signal.push(0)
        else {
          signal.push(lastZero)
          lastZero *= -1
        }
      }
      return signal
    },
    'Manchester': (binary: string) => {
      let signal = []
      for (let bit of binary) {
        signal.push(bit === '0' ? 1 : -1)
        signal.push(bit === '0' ? -1 : 1)
      }
      return signal
    },
    'Differential Manchester': (binary: string) => {
      let signal = []
      let lastBit = -1
      for (let bit of binary) {
        if (bit === '0') {
          signal.push(lastBit)
          signal.push(-lastBit)
        } else {
          signal.push(-lastBit)
          signal.push(lastBit)
          lastBit *= -1
        }
      }
      return signal
    }
  }

  const handleEncode = () => {
    const encoded: { [key: string]: number[] } = {}
    for (const [technique, encodingFunction] of Object.entries(encodingTechniques)) {
      encoded[technique] = encodingFunction(binaryInput)
    }
    setEncodedSignals(encoded)
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Digital Signal Encoder</h1>
      <div className="mb-4 w-full max-w-md">
        <Label htmlFor="binaryInput">Enter Binary Signal:</Label>
        <Input
          type="text"
          id="binaryInput"
          value={binaryInput}
          onChange={(e) => setBinaryInput(e.target.value.replace(/[^01]/g, ''))}
          placeholder="e.g., 10110"
          className="mt-1 w-full"
        />
      </div>
      <Button onClick={handleEncode} className="mb-4 w-full max-w-md">Encode</Button>
      {Object.entries(encodedSignals).map(([technique, signal]) => (
        <EncodingTechnique key={technique} title={technique} signal={signal} />
      ))}
    </div>
  )
}