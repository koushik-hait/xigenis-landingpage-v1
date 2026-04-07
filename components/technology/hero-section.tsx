import { Mail, Search, Settings, User, PlayCircle, FileText, CheckCircle } from "lucide-react"

export function TechnologyHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0d1b2a]">
      <div className="container mx-auto px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl leading-tight font-bold text-white uppercase md:text-5xl lg:text-6xl">
              Looking for an
              <br />
              outsourced web
              <br />
              development
              <br />
              partner?
            </h1>
            <p className="text-lg font-medium text-white">We've got you covered!</p>
            <p className="text-base text-gray-400">
              We work with trusted third-party development partners to ensure your project's success.
            </p>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-500/10 blur-3xl" />

              <div className="relative">
                <div className="relative h-[500px] w-[280px] md:h-[600px] md:w-[350px]">
                  <div className="absolute inset-0 overflow-hidden rounded-[3rem] border-8 border-gray-700 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 shadow-2xl">
                    <div className="absolute top-0 left-1/2 h-6 w-24 -translate-x-1/2 rounded-b-3xl bg-gray-900" />

                    <div className="relative h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 p-6 pt-12">
                      <div className="absolute top-8 right-6 left-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                            <User className="h-7 w-7 text-indigo-600" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 h-3 w-3/4 rounded bg-white/40" />
                            <div className="h-2 w-1/2 rounded bg-white/30" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute right-6 bottom-32 left-6 space-y-4">
                        <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                            <Mail className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1.5 h-2 w-2/3 rounded bg-white/40" />
                            <div className="h-1.5 w-1/2 rounded bg-white/30" />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                            <FileText className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1.5 h-2 w-3/4 rounded bg-white/40" />
                            <div className="h-1.5 w-2/3 rounded bg-white/30" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute right-6 bottom-8 left-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                        <div className="mb-2 flex items-center justify-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white/40" />
                          <div className="h-2 w-2 rounded-full bg-white" />
                          <div className="h-2 w-2 rounded-full bg-white/40" />
                        </div>
                        <div className="text-center">
                          <div className="mx-auto mb-2 h-3 w-2/3 rounded bg-white" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-white" />
                  </div>
                </div>

                <div className="absolute -top-8 -left-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-teal-300/30 bg-teal-400/30 shadow-xl backdrop-blur-sm">
                  <Mail className="h-10 w-10 text-teal-300" />
                </div>

                <div className="absolute top-24 -right-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-300/30 bg-purple-400/30 shadow-xl backdrop-blur-sm">
                  <User className="h-10 w-10 text-purple-300" />
                </div>

                <div className="absolute bottom-32 -left-12 flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-300/30 bg-indigo-400/30 shadow-xl backdrop-blur-sm">
                  <Search className="h-10 w-10 text-indigo-300" />
                </div>

                <div className="absolute top-1/3 -right-12 flex h-20 w-20 items-center justify-center rounded-2xl border border-teal-300/30 bg-teal-400/30 shadow-xl backdrop-blur-sm">
                  <Settings className="h-10 w-10 text-teal-300" />
                </div>

                <div className="absolute -right-16 bottom-48 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/30 bg-gradient-to-br from-white/20 to-white/10 shadow-xl backdrop-blur-sm">
                  <div className="text-center">
                    <PlayCircle className="mx-auto mb-1 h-12 w-12 text-white" />
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-16 h-28 w-28 rounded-2xl border border-white/30 bg-gradient-to-br from-white/20 to-white/10 p-4 shadow-xl backdrop-blur-sm">
                  <CheckCircle className="mb-2 h-8 w-8 text-green-400" />
                  <div className="space-y-1">
                    <div className="h-2 w-full rounded bg-white/40" />
                    <div className="h-1.5 w-3/4 rounded bg-white/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
