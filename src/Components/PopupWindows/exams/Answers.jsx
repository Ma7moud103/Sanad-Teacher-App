import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';
import addA from '../../../Assets/sanadSVG/addQ.svg';
import { MainContext } from '../../../Context/MainContext';
import del from '../../../Assets/sanadSVG/redDel.svg';
function Answers() {
	const [t] = useTranslation();
	const { newAnswer, setNewAnswer } = useContext(MainContext);
	const [answers, setAnswers] = useState([]);
	const [correctAnswers, setCorrectAnswers] = useState([]);
	const [response] = useState(true);

	// Set this to true for multiple correct answers

	const handleAddAnswer = (e) => {
		e.preventDefault();
		setAnswers([...answers, { text: newAnswer, id: Date.now() }]);
		setNewAnswer('');
	};

	const handleCorrectAnswerChange = (id) => {
		if (response) {
			setCorrectAnswers((prev) => {
				if (prev.includes(id)) {
					return prev.filter((answerId) => answerId !== id);
				} else {
					return [...prev, id];
				}
			});
		} else {
			setCorrectAnswers([id]);
		}
	};


	const handleDelet = (id) => {
		const result = answers.filter((item) => {
			return item.id !== id;
		});
		setAnswers(result);
	};

	return (
		<>
			<div className="header w-full flex items-center justify-between px-4">
				<h5>{t('exam.answers')}</h5>
				<button
					className="bg-mainColor text-white  rounded-lg flex items-center gap-x-2 text-sm sm:text-base p-2 "
					onClick={(e) => handleAddAnswer(e)}
				>
					<ReactSVG src={addA} />
					{t('exam.addAns')}
				</button>
			</div>
			{/* ${
					toggleItem ? 'bg-mainColor text-white' : 'bg-white text-mainColor '
				} */}
			<div
				className={`w-full   font-bold p-2 py-3 rounded-lg flex items-center justify-between`}
			>
				<div className="w-full ">
					<ul className="list-disc pe-5">
						{answers.map((answer) => (
							<li
								key={answer.id}
								className={`mb-2 flex items-center justify-between  p-3 rounded-lg ${correctAnswers.includes(answer.id)
									? 'bg-mainColor text-white'
									: 'bg-white text-mainColor'
									}`}
							>
								<div className="flex  items-center  w-[90%]  gap-x-1">
									<input
										type="checkbox"
										checked={correctAnswers.includes(answer.id)}
										onChange={() => handleCorrectAnswerChange(answer.id)}
										className="mx-1 outline-mainColor focus:border-mainColor focus:outline-mainColor border-[#BDC4CD] border-[1px] rounded-lg w-[20px] h-[20px] text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none cursor-pointer"
									/>
									<p
										id={answer.id}
										className={`${correctAnswers.includes(answer.id)
											? ' text-white'
											: ' text-mainColor'
											}   font-bold break-words overflow-hidden`}
									>
										{answer.text}
									</p>
								</div>

								<span
									onClick={() => handleDelet(answer.id)}
									className="cursor-pointer"
								>
									<ReactSVG src={del} />
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default Answers;
