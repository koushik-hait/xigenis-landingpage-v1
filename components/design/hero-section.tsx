export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a1628]">
      <div className="container mx-auto px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-5xl leading-tight font-bold text-white md:text-6xl lg:text-7xl">
              MANAGE YOUR
              <br />
              BUSINESS
              <br />
              WITH EASE,
              <br />
              EVERYDAY.
            </h1>
            <p className="max-w-md text-lg text-gray-400">
              Streamline operations with powerful tools for teams of all sizes.
            </p>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />

              <div className="relative max-w-2xl rounded-3xl border border-gray-800 bg-black p-4 shadow-2xl">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="ml-auto">
                    <div className="flex gap-1">
                      <div className="h-0.5 w-6 rounded bg-gray-400" />
                      <div className="h-0.5 w-6 rounded bg-gray-400" />
                      <div className="h-0.5 w-6 rounded bg-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-purple-900/50 p-8">
                  <div className="absolute inset-0 bg-[url('/assets/images/default.svg')] opacity-10" />

                  <div className="relative z-10">
                    <div className="mb-8 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                      <span className="text-sm font-semibold text-white">Admin Dashboard</span>
                    </div>

                    <div className="space-y-6">
                      <h2 className="text-3xl leading-relaxed font-light text-white">
                        Unified platform for managing users, inventory, and billing
                      </h2>

                      <p className="text-sm text-gray-400 italic">
                        Real-time insights help you make data-driven decisions faster.
                      </p>

                      <p className="text-xl font-light text-white">Everything you need in one place.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 -bottom-8 z-10 w-64 rounded-3xl border border-gray-800 bg-gradient-to-br from-blue-950 to-purple-950 p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Complete</span>
                    <span>•</span>
                    <span>Business Management</span>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-4">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                      <div className="h-8 w-8 rounded-full bg-white" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="mb-2 font-semibold text-white">Track performance metrics in real-time</h3>
                    <button className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-2 text-sm font-semibold text-white">
                      Get Started
                    </button>
                  </div>

                  <div className="text-xs text-gray-400">
                    <p className="mb-1 font-semibold text-white">Multi-role access control</p>
                    <p className="text-[10px] leading-relaxed">
                      Seven distinct roles with customized permissions and dashboards for your entire team.
                    </p>
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
