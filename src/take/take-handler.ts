import { env } from "process";

export async function handler() {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      [
        {
          title: "Free guitar",
          description: "Only a couple of broken  strings!\n\nOfficeworks, Bourke St",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Red_Hot_Chili_Peppers_-_Rock_am_Ring_2016_-2016156230942_2016-06-04_Rock_am_Ring_-_Sven_-_1D_X_MK_II_-_0410_-_AK8I1358_mod.jpg/600px-Red_Hot_Chili_Peppers_-_Rock_am_Ring_2016_-2016156230942_2016-06-04_Rock_am_Ring_-_Sven_-_1D_X_MK_II_-_0410_-_AK8I1358_mod.jpg",
          listedTime: "2021-12-20T23:39:46+0000",
          location: {
            "lat": -37.815470,
            "lng": 144.959191
          },
        },
      ],
      null,
      2
    ),
  };

  return response;
}
