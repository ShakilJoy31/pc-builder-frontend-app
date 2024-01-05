"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import {
  BiSend,
  BiSolidCommentAdd,
} from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

import { CustomerAPI } from '../../APIcalling/customerAPI';
import DashboardCSS from '../../style/Dashboard.module.css';
import IndividualCSS from '../../style/Individual.module.css';
import {
  AuthenticUser,
  LoggedInUserStore,
} from '../../userStore';

const Page = ({ individualProduct, setIndividualProduct }) => {
    const [viewReply, setViewReply] = useState(false);
    const [isReviewFields, setIsReviewFields] = useState(false);
    const [selectedCommentToReply, setSelectedCommentToReply] = useState(false);
    const [reviewerComment, setReviewerComment] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = LoggedInUserStore.useContainer();
    const { authenticatedUser, setAuthenticatedUser } = AuthenticUser.useContainer();
    const handleTargetCommentToReview = async (getComment) => {
        await CustomerAPI.handleGettingProduct(individualProduct._id).then(res => {
            setIsReviewFields(true);
            const targetComment = res.comments.find(comment => comment?.userId === getComment?.userId);
            setSelectedCommentToReply(targetComment);
        });
    }
    useEffect(()=> {
        if(JSON.parse(localStorage.getItem('AdminUser'))){
            setIsAdmin(true);
        }
    },[])
    const [selectedRepliesToSee, setSelectedRepliesToSee] = useState(false);
    const seeRepliesForTheTargetComment = (getComment) => {
        setViewReply(!viewReply);
        const targetComment = individualProduct.comments.find(comment => comment?.userId === getComment?.userId);
        setSelectedRepliesToSee(targetComment);
    }

    function getCurrentDateTime() {
        const currentDate = new Date();
        return currentDate.toLocaleString();
    }
    const handlePostReviewForIndividualComment = () => {
        const reviewTime = getCurrentDateTime();
        const reviewData = {
            reviewerName: authenticatedUser.name || isLoggedIn.name,
            reviewerComment: reviewerComment,
            repliedCommentId: selectedCommentToReply?.userId,
            reviewTime: reviewTime
        }
        CustomerAPI.addReviewToComment(individualProduct?._id, reviewData).then(res => {
            const previousReview = individualProduct?.comments.find(review => review.userId === selectedCommentToReply.userId).reviews;
            previousReview?.push(reviewData);
            setIndividualProduct({ ...individualProduct })
            setIsReviewFields(false);
        })
    }

    const handleDeleteCommentByAdmin = (getComment) =>{
        CustomerAPI.handleDeletingCommentByAdmin(individualProduct?._id, getComment.userId).then(res => {
            CustomerAPI.handleGettingProduct(individualProduct?._id).then(res => setIndividualProduct(res))
        });
    }
    const handleDeleteReviewByAdmin = (getReview) =>{
        CustomerAPI.handleDeletingReviewByAdmin(individualProduct?._id, getReview.repliedCommentId, getReview.reviewerComment).then(res => {
            CustomerAPI.handleGettingProduct(individualProduct?._id).then(res => setIndividualProduct(res))
        });
    }
    return (
        <div>
            <div className={`${DashboardCSS.commentsContainer}`}>
                {individualProduct?.comments?.map((comment, index) => (
                    <div style={{ borderBottom: `${index + 1 === individualProduct?.comments?.length ? '' : '1px solid crimson'}` }} className={`${DashboardCSS.comment}`} key={index}>
                        <div>
                            <div className='flex justify-between items-center'>
                                <p className={`${DashboardCSS.user}`}>{comment.commentAndRating?.name}</p>
                                <p className={`${DashboardCSS.date}`}>{comment?.timeOfComment}</p>
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-between items-center'>
                                <p className={`${DashboardCSS.commentText}`}>{comment?.commentAndRating?.comment}</p>

                                <div className='flex items-center gap-x-3'>
                                <span onClick={() => handleTargetCommentToReview(comment)} className={`${IndividualCSS.plusCommnet}`}><BiSolidCommentAdd size={25}></BiSolidCommentAdd></span>

                                {
                                    !authenticatedUser ? <span onClick={() => handleDeleteCommentByAdmin(comment)} className={`${IndividualCSS.plusCommnet}`}><MdDelete size={25}></MdDelete></span> : ''
                                }
                                
                                </div>
                            </div>

                            {
                                isReviewFields ? (comment?.userId === selectedCommentToReply?.userId ? <div className={`flex justify-between items-center pl-2 md:pl-3 lg:pl-4 w-full my-3`}>

                                    <div style={{
                                        borderRadius: '8px',
                                        background: 'white',
                                    }} className='w-full flex items-center'>
                                        <textarea
                                            style={{
                                                borderRadius: '8px',
                                                background: 'white',
                                            }}
                                            onChange={(e) => setReviewerComment(e.target.value)}
                                            placeholder={`Hi ${authenticatedUser.name || isLoggedIn.name},  Please type your review here`}
                                            className={`w-full h-[35px] focus:outline-none border-0 pl-1 text-black`}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                        {
                                            (authenticatedUser?.name || reviewerComment) ? <span className="loading loading-dots loading-sm text-black"></span> : ''
                                        }
                                    </div>

                                    <span onClick={handlePostReviewForIndividualComment} className={`${IndividualCSS.plusCommnet}`}><BiSend size={25}></BiSend></span>

                                </div> : '') : ''

                            }

                            {
                                viewReply ? (comment?.userId === selectedRepliesToSee?.userId ? <span onClick={() => seeRepliesForTheTargetComment(comment)} className={`${DashboardCSS.date} hover:cursor-pointer`}>{comment?.reviews?.length > 0 ? 'Close replies' : ''}</span> : <span onClick={() => seeRepliesForTheTargetComment(comment)} className={`${DashboardCSS.date} hover:cursor-pointer`}>{comment?.reviews?.length > 0 ? `View ${comment?.reviews?.length} replies` : ''}</span>) : <span onClick={() => seeRepliesForTheTargetComment(comment)} className={`${DashboardCSS.date} hover:cursor-pointer`}>{comment?.reviews?.length > 0 ? `View ${comment?.reviews?.length} replies` : ''}</span>
                            }

                            {/* The reviews for the individual comment */}
                            {
                                viewReply ? (comment?.userId === selectedRepliesToSee?.userId ? <div className='pl-3 md:pl-4 lg:pl-5'>
                                    {
                                        comment?.reviews?.map((review, index) => <div key={index} style={{ borderBottom: `${index + 1 === comment?.reviews?.length ? '' : '1px solid #888'}` }} className='mb-1'>
                                            <div className='flex justify-between items-center'>
                                                <p className={`${DashboardCSS.user}`}>{review?.reviewerName}</p>

                                                <p className={`${DashboardCSS.date}`}>{review?.reviewTime}</p>
                                            </div>

                                            <div className='flex justify-between items-center'>
                                                <p className={`${DashboardCSS.commentText}`}>{review.reviewerComment}</p>

                                                {
                                                    authenticatedUser ? <span onClick={() => handleDeleteReviewByAdmin(review)} className={`${IndividualCSS.plusCommnet}`}><MdDelete size={25}></MdDelete></span> : ''
                                                }
                                                
                                            </div>
                                        </div>)
                                    }
                                </div> : '') : ''
                            }

                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default Page;