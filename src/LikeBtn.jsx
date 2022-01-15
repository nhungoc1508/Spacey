import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const LikeBtn = ({ liked, likePost }) => {
    return (
        <button id="like-button" className="text-2xl justify-self-end mx-10 rounded-lg h-12"><FontAwesomeIcon className={liked ? "text-rose-600" : "text-white"} icon={faHeart} onClick={likePost}/></button>
    )
}

export default LikeBtn;