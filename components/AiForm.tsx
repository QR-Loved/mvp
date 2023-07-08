export default function AiForm() {

  const scrollToBios = () => {
      if (bioRef.current !== null) {
        bioRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
  const prompt = `Generate 2 ${vibe} kind messages to a loved one. Do not include emojis. clearly labeled "1." and "2.". ${
  vibe === "Funny"
      ? "Make sure there is a joke in there and it's a little ridiculous."
      : null
  }
      Make sure each generated message is less than 300 characters and works for any time of day, has sentences that are found in hallmark cards, and base them on this context: ${bio}${
  bio.slice(-1) === "." ? "" : "."
  }`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }
    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? ""
          setGeneratedBios((prev) => prev + text);
        } catch (e) {
          console.error(e);
        }
      }
    }
    // https://web.dev/streams/#the-getreader-and-read-methods
    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParse);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };
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