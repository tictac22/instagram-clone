import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { app } from "./config"

// Create a root reference
const storage = getStorage(app)
const metadata = { contentType: "image/jpeg" }

export const savePhotoUrl = async (img: string) => {
	const imageRef = ref(storage, "photoUrl/" + uuidv4())
	const file = await blobToFile(img)
	await uploadBytes(imageRef, file, metadata)

	const path = await getDownloadURL(imageRef)
	return path
}
export const saveFiles = async (imgUrl: Blob[]) => {
	const images: string[] = []

	for (let index = 0; index < imgUrl.length; index++) {
		const element = imgUrl[index]
		const file = await blobToFile(element)
		const imageRef = ref(storage, "post/" + uuidv4())

		await uploadBytes(imageRef, file, metadata)
		const image = await getDownloadURL(imageRef)
		images.push(image)
	}

	return images
}

const blobToFile = async (image: Blob | string) => {
	//@ts-ignore
	const result = await fetch(image)
	const blobFile = await result.blob()
	return new File([blobFile], uuidv4(), { type: blobFile.type })
}
