module.exports = {
  GetDevice: 0x94,
  SetIP: 0x96,
  GetListener: 0x92,
  SetListener: 0x90,
  GetTime: 0x32,
  SetTime: 0x30,
  OpenDoor: 0x40,
  GetDoorControl: 0x82,
  SetDoorControl: 0x80,
  RecordSpecialEvents: 0x8e,

  GetStatus: 0x20,
  GetCards: 0x58,
  GetCardByID: 0x5a,
  GetCardByIndex: 0x5c,
  PutCard: 0x50,
  DeleteCard: 0x52,
  DeleteCards: 0x54,

  GetTimeProfile: 0x98,
  SetTimeProfile: 0x88,
  ClearTimeProfiles: 0x8a,
  SetDoorPasscodes: 0x8c,

  SetPCControl: 0xa0,
  SetInterlock: 0xa2,
  ActivateKeypads: 0xa4,
  ClearTaskList: 0xa6,
  AddTask: 0xa8,
  RefreshTaskList: 0xac,

  GetEventIndex: 0xb4,
  SetEventIndex: 0xb2,
  GetEvent: 0xb0,

  NormallyOpen: 0x01,
  NormallyClosed: 0x02,
  Controlled: 0x03
}
