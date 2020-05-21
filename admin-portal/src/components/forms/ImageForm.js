import React from 'react';
import { configureImageURL, INGREDIENTS_URL, RECIPES_URL } from '../../utils/imageDirectories';

import FormField from './FormField';

const ImageForm = ({ image, previewImage, handleImageChange, 
        from, clearImage, derived }) => {


    const handleImageDisplay = () => {
        if (from === 'update' && !previewImage) {
            let IMAGE_URL;
            
            if (derived === 'ingredient') {
                IMAGE_URL = INGREDIENTS_URL;
            }

            if (derived === 'recipe') {
                IMAGE_URL = RECIPES_URL;
            }

            return IMAGE_URL + configureImageURL(image);

        } else if (from === 'update' && previewImage || from === 'add' && previewImage) {
            return URL.createObjectURL(image);
        } 
    }

    return (
        <div className="initial-fields">
            {image ?
            <div className="image-file">
                
                    <button onClick={clearImage}>
                        x
                    </button>
                    <img src={handleImageDisplay()} 
                        alt={'avatar preview'} 
                        className="circle-image" 
                        width="500" height="500"
                    />
                </div> :

                <FormField type="file" name="avatar" 
                    handleChange={(e) => handleImageChange(e)}
                    accept=".png, .jpg, .jpeg"
                />
            }
            </div>
    )
}

export default ImageForm;