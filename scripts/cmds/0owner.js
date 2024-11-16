const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		author: "Tokodori",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "admin",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: '𝐋𝐨𝐫𝐝 𝐊𝐢𝐧𝐠',
				gender: '𝐦𝐥𝐞',
				hobby: '𝐊𝐢𝐥𝐥𝐢𝐧𝐠 𝐲𝐨𝐮',
				Fb:  'https://www.facebook.com/lordjaydenSmith.1',
				Relationship: '𝐘𝐨𝐮𝐫',
				bio: '𝐖𝐨𝐫𝐥𝐝 𝐈𝐬 𝐅𝐮𝐥𝐥 𝐎𝐟 𝐖𝐨𝐧𝐝𝐞𝐫𝐬. 𝐑𝐢𝐠𝐡𝐭'
			};

			const bold = 'https://i.imgur.com/AubbSUX.mp4';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
◈ 𝖬𝗒 𝖣𝖾𝖺𝗋 𝖩𝖺𝗒𝖽𝖾𝗇 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n
Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Relationship: ${ownerInfo.Relationship}
Hobby: ${ownerInfo.hobby}
Fb: ${ownerInfo.Fb}
Bio: ${ownerInfo.bio}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(videoPath);

			api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
