
import { IoMdCloseCircleOutline } from "react-icons/io";
import AnswerCard from "./AnswerCard";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
const AnswersList = ({ answers, onClose, submitAnswer, isLoading, answerInput, setAnswerInput }) => {
  

  
  const onSubmit = async () => {
   
    if (!answerInput || answerInput.trim().length === 0) {
      toast.error("Answer cannot be empty.");
      return;
    }
    await submitAnswer(answerInput);
    onClose(); 
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <>
  
      <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-xl max-h-[70vh] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-5 flex flex-col shadow-lg overflow-hidden">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          onClick={handleClose}
        >
          <IoMdCloseCircleOutline />
        </button>

        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-bold text-center">Answers</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center flex-1">
            <ClipLoader color="blue" loading={true} size={50} />
          </div>
        ) : (
          <div className="mt-2 w-full overflow-y-auto flex-1 space-y-4 pr-1">
           {!answers || answers.length === 0 ? (
              <p className="text-center text-gray-500">
                No answers. Be the first to answer this question.
              </p>
            ) : (
              answers.map((answer) => (
                <AnswerCard key={answer._id} answerData={answer} />
              ))
            )}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Add a comment"
             value={answerInput}
             onChange={(e) => setAnswerInput(e.target.value)} 
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={!answerInput}
            onClick={onSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default AnswersList;
