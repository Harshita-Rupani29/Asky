import Header from "../components/Header"

export default function AskQuestion() {
  return (
    
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-between">
       <Header></Header>
      <main className="flex justify-center items-center flex-1 px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-[#2f3542] mb-2">Ask a Question</h2>
          <p className="text-sm text-[#576574] mb-6">
            Provide a detailed title, description, and relevant tags for your question. This will help others understand and provide accurate answers.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#2f3542] mb-1">
                Question Title
              </label>
              <input
                type="text"
                placeholder="Enter your question title here"
                className="w-full px-4 py-2 border border-[#dfe4ea] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4de7c] bg-white text-[#2f3542]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2f3542] mb-1">
                Detailed Description
              </label>
              <textarea
                rows="5"
                placeholder="Provide detailed information about your question"
                className="w-full px-4 py-2 border border-[#dfe4ea] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#a4de7c] bg-white text-[#2f3542]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2f3542] mb-1">
                Tags
              </label>
              <input
                type="text"
                placeholder="Add relevant tags (e.g., JavaScript, HTML)"
                className="w-full px-4 py-2 border border-[#dfe4ea] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4de7c] bg-white text-[#2f3542]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#a4de7c] hover:bg-[#94cf6d] text-white font-semibold py-2 rounded-md transition-all duration-150"
            >
              Post Your Question
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e0e0e0] py-4 px-10 flex justify-between items-center text-sm text-[#2f3542]">
        <div>
          <p>Contact Us</p>
          <a href="mailto:email@qandahub.com" className="text-blue-600 underline">
            email@qandahub.com
          </a>
          <p>+1 234 567 890</p>
        </div>
        <div className="flex gap-4 text-lg">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </footer>
    </div>
  );
}
