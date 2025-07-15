
export function getCostBasedOnGuestsAndRooms(hotel, guests, rooms, nights) {
  const pricePerGuest = hotel.price_per_night_per_guest || 0;
  return parseFloat((pricePerGuest * guests * rooms * nights).toFixed(2));
}


export async function getUpdatePriceAsPerCustomerNeeds(payload, hotelList) {
  const { guests = 1, rooms = 1, checkIn, checkOut } = payload;

  const nights =
    checkIn && checkOut
      ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) || 1
      : 1;
  return hotelList.map((hotel) => {
    const totalCost = getCostBasedOnGuestsAndRooms(hotel, guests, rooms, nights);
    return {
      ...hotel,
      totalCost,
      stayDuration: nights,
    };
  });
}
