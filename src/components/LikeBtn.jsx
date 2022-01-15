import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const LikeBtn = ({ liked, likePost }) => {
    return (
        <button title="Like this photo" className="text-2xl mx-10 h-12"><FontAwesomeIcon className={liked ? "text-rose-600" : "text-white"} icon={faHeart} onClick={likePost}/></button>
    )
}

export default LikeBtn;