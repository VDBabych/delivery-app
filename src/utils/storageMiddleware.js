import { nanoid } from "nanoid";

const currentParcel = "CURRENT_PARCEL";
const parcelsList = "PARCELS_LIST";

const remove = (key) => {
  localStorage.removeItem(key);
};

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const removeCurrentParcel = () => {
  remove(currentParcel);
};

const saveCurrrentParcel = (parcel) => {
  save(currentParcel, parcel);
};

const loadCurrentParcel = () => {
  return load(currentParcel);
};

const getParcels = () => {
  return load(parcelsList);
};

const addParcel = (parcel) => {
  const parcels = getParcels();
  if (Array.isArray(parcels)) {
    parcels.push({
      id: nanoid(),
      ...parcel,
    });
    save(parcelsList, parcels);
    return;
  }
  save(parcelsList, [
    {
      id: nanoid(),
      ...parcel,
    },
  ]);
  return;
};

const getParcelById = (id) => {
  const parcels = getParcels();
  const parcel = parcels.filter((parcel) => parcel.id === id);
  if (!parcel) return;
  if (parcel?.length !== 1) return;
  return parcel[0];
};

const updateParcelById = (id, parcel) => {
  const parcels = getParcels();
  const updatedParcels = parcels.filter((item) => item.id !== id);
  updatedParcels.push({
    id,
    ...parcel,
  });
  save(parcelsList, updatedParcels);
};

const deleteParcelById = (id) => {
  const parcels = getParcels();
  const updatedParcels = parcels.filter((item) => item.id !== id);
  save(parcelsList, updatedParcels);
};

export default {
  deleteParcelById,
  updateParcelById,
  saveCurrrentParcel,
  loadCurrentParcel,
  getParcels,
  addParcel,
  removeCurrentParcel,
  getParcelById,
};
