"use client"

import { useEffect, useState } from "react"

const codeLines = [
  "const innovation = () => {",
  "  return creativity.map(idea => {",
  "    const solution = transform(idea);",
  "    return solution.deploy();",
  "  });",
  "};",
  "",
  "class DigitalAgency {",
  "  constructor() {",
  '    this.vision = "Empowering";',
  '    this.mission = "Transform";',
  "  }",
  "",
  "  async buildFuture() {",
  "    const design = await this.create();",
  "    const product = await this.develop();",
  "    return this.launch(product);",
  "  }",
  "}",
  "",
  "export default Megaabyte;",
]

function highlightSyntax(code: string) {
  // Strings
  code = code.replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')

  // Function calls
  code = code.replace(/\b(\w+)\(/g, '<span class="text-yellow-400">$1</span>(')

  // Methods
  code = code.replace(/\.(\w+)/g, '.<span class="text-cyan-400">$1</span>')

  // Arrow functions
  code = code.replace(/=>/g, '<span class="text-pink-400">=></span>')

  return code
}

export function CodeBackground() {
  const [displayedCode, setDisplayedCode] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      const resetTimer = setTimeout(() => {
        setDisplayedCode([])
        setCurrentLine(0)
        setCurrentChar(0)
      }, 3000)
      return () => clearTimeout(resetTimer)
    }

    const line = codeLines[currentLine]

    if (currentChar <= line!.length) {
      const timer = setTimeout(() => {
        setDisplayedCode((prev) => {
          const newCode = [...prev]
          newCode[currentLine] = line!.slice(0, currentChar)
          return newCode
        })
        setCurrentChar((prev) => prev + 1)
      }, 30)

      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
        setCurrentChar(0)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [currentLine, currentChar])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="via-background/30 to-background/80 absolute inset-0 bg-gradient-to-b from-transparent" />
      <pre className="p-4 font-mono text-sm leading-relaxed text-slate-300/50 sm:p-8 sm:text-base md:text-lg">
        {displayedCode.map((line, index) => (
          <div key={index} className="whitespace-pre">
            <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }} />
            {index === currentLine && currentChar <= codeLines[currentLine]!.length && (
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-cyan-400/70" />
            )}
          </div>
        ))}
      </pre>
    </div>
  )
}
