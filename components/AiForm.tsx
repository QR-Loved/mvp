export default function AiForm() {

  return (
  <>
      <div className="flex mt-5 items-center space-x-3">
        <p className="text-left font-medium">
          What do you want your loved one to know?{" "}
          <span className="text-slate-500">
            (write a few sentences about them)
          </span>
          .
        </p>
      </div>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={4}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
        // placeholder={
        //   "ex. I miss you"
        // }
      />
      <div className="flex mb-5 items-center space-x-3">
        <p className="text-left font-medium">Select your vibe.</p>
      </div>
      <div className="block">
        <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
      </div>

      {!loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          onClick={(e) => generateBio(e)}
        >
          Generate your love note &rarr;
        </button>
      )}
      {loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          disabled
        >
          <LoadingDots color="white" style="large" />
        </button>
      )}
    </div>
    <Toaster
    position="top-center"
    reverseOrder={false}
    toastOptions={{ duration: 2000 }}
    />
    <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
    <div className="space-y-10 my-10">
      {generatedBios && (
        <>
          <div>
            <h2
              className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
              ref={bioRef}
            >
              Your love notes
            </h2>
          </div>
          <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
            {generatedBios
              .substring(generatedBios.indexOf("1") + 3)
              .split("2.")
              .map((generatedBio) => {
                return (
                  <div
                    className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedBio);
                      toast("Bio copied to clipboard", {
                        icon: "✂️",
                      });
                    }}
                    key={generatedBio}
                  >
                    <p>{generatedBio}</p>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  </>
 );
}