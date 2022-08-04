import { Fragment, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Right } from '../../components/Layouts/components'
import CenterContent from './CenterContent';
import LeftContent from './LeftContent';
import CoverImage from './CoverImage';
import { UserPageContext } from './UserPageContext';
import userApi from '../../api/userApi';
import getImage from '../../hooks/getImage';
import getCookie from '../../hooks/getCookie';

function UserPage() {
    const { id } = useParams();
    const context = useContext(UserPageContext);
    const userData = JSON.parse(getCookie('userin'));

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await userApi.getAll(id, userData.id);
                if(res.data.follow_status == '1')
                    context.setFollowCheck(true);
                else
                    context.setFollowCheck(false);
                context.setUserData(res.data);
                context.setPostData(res.blog);
                if(res.data.avatar !== null)
                {
                    const imageUrl = await getImage(res.data.avatar);
                    context.setUserAva(imageUrl);
                }
            } catch (error) {
                console.log('Toang meo chay r loi cc ', error);
            }
        };

        fetchUserData();
    }, [id])

    return (  
        <Fragment>
            <div className='row m-0'>
                <CoverImage />
            </div>
            <div className='row m-0 pt-3'>
                <div className="col-sm-2 ps-1 pe-0">
                    <LeftContent />
                </div>
                
                <div className="col-sm-8 mb-4" id="body-content">
                    <CenterContent />
                </div>
                
                <div className="col-sm-2 ps-0 pe-1">
                    <Right/>
                </div>
            </div>
        </Fragment>
    );
}

export default UserPage;