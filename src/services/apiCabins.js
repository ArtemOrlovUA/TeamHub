import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error.message);
    throw new Error('An error occurred while fetching cabins');
  }

  return data;
}

export async function createEditCabin(cabin, id) {
  let imagePath;
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll('/', '');

  if (typeof cabin.image === 'string') {
    imagePath = cabin.image;
  } else {
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  let query = supabase.from('cabins');

  // FOR CREATE CABIN
  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
  }

  // FOR UPDATING CABIN
  if (id) {
    query = query
      .update({ ...cabin, image: imagePath })
      .eq('id', id)
      .select();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error.message);
    throw new Error('An error occurred while creating or editing the cabin');
  }

  // Only upload the image if it's a new File object
  if (cabin.image instanceof File) {
    const { error: uploadError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, cabin.image, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      console.error(uploadError.message);
      throw new Error('Image upload failed');
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error('An error occurred while deleting the cabin');
  }

  return data;
}
