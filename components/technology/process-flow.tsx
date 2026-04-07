import { User, Lightbulb, Rocket, TestTube, CheckCircle, ArrowRight } from "lucide-react"

interface Step {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  iconBg: string
}

export function ProcessFlow() {
  const steps: Step[] = [
    {
      number: 1,
      title: "Discovery & Requirements",
      description: "Client shares project requirements, goals, and vision with the agency",
      icon: <User className="h-8 w-8 text-blue-600" />,
      iconBg: "bg-blue-100",
    },
    {
      number: 2,
      title: "Planning & Strategy",
      description: "Agency identifies the right tech stack, timeline, and development approach",
      icon: <Lightbulb className="h-8 w-8 text-green-600" />,
      iconBg: "bg-green-100",
    },
    {
      number: 3,
      title: "Design & Development",
      description: "Kickoff with the development team, design support, and iterative builds",
      icon: <Rocket className="h-8 w-8 text-purple-600" />,
      iconBg: "bg-purple-100",
    },
    {
      number: 4,
      title: "Quality Assurance",
      description: "Agency performs thorough testing and QA to ensure the final version is flawless",
      icon: <TestTube className="h-8 w-8 text-orange-600" />,
      iconBg: "bg-orange-100",
    },
    {
      number: 5,
      title: "Delivery & Launch",
      description: "Client approves the final product and the project goes live successfully",
      icon: <CheckCircle className="h-8 w-8 text-teal-600" />,
      iconBg: "bg-teal-100",
    },
  ]

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            WE WORK WITH TRUSTED
            <br />
            IMPLEMENTATION PARTNERS
          </h2>
        </div>

        <div className="relative mx-auto hidden max-w-7xl items-start justify-between lg:flex">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`${step.iconBg} mb-4 flex h-20 w-20 items-center justify-center rounded-full shadow-sm`}
                >
                  {step.icon}
                </div>

                <div className="max-w-[180px] text-center">
                  <p className="mb-1 text-xs tracking-wider text-gray-500 uppercase">STEP - {step.number}</p>
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600">{step.description}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center px-4 pt-10">
                  <div className="flex items-center gap-1">
                    <div className="h-0.5 w-2 bg-gray-300" />
                    <div className="h-0.5 w-2 bg-gray-300" />
                    <div className="h-0.5 w-2 bg-gray-300" />
                    <div className="h-0.5 w-2 bg-gray-300" />
                    <div className="h-0.5 w-2 bg-gray-300" />
                  </div>
                  <ArrowRight className="ml-1 h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-md space-y-8 lg:hidden">
          {steps.map((step, index) => (
            <div key={step.number}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`${step.iconBg} mb-4 flex h-20 w-20 items-center justify-center rounded-full shadow-sm`}
                >
                  {step.icon}
                </div>

                <p className="mb-1 text-xs tracking-wider text-gray-500 uppercase">STEP - {step.number}</p>
                <h3 className="mb-2 text-base font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="my-6 flex justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-2 w-0.5 bg-gray-300" />
                    <div className="h-2 w-0.5 bg-gray-300" />
                    <div className="h-2 w-0.5 bg-gray-300" />
                    <ArrowRight className="h-5 w-5 rotate-90 transform text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
