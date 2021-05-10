const GET_DEVICE = 0x94
const SET_IP = 0x96
const GET_LISTENER = 0x92
const SET_LISTENER = 0x90

const GET_STATUS = 0x20
const SET_TIME = 0x30
const GET_TIME = 0x32

const OPEN_DOOR = 0x40
const GET_DOOR_CONTROL = 0x82
const SET_DOOR_CONTROL = 0x80

const GET_CARDS = 0x58
const GET_CARD_BY_ID = 0x5a
const GET_CARD_BY_INDEX = 0x5c
const PUT_CARD = 0x50
const DELETE_CARD = 0x52
const DELETE_CARDS = 0x54

const RECORD_SPECIAL_EVENTS = 0x8e
const GET_EVENT_INDEX = 0xb4
const SET_EVENT_INDEX = 0xb2
const GET_EVENT = 0xb0

const NORMALLY_OPEN = 0x01
const NORMALLY_CLOSED = 0x02
const CONTROLLED = 0x03

module.exports = {
  GetDevice: GET_DEVICE,
  SetIP: SET_IP,
  GetListener: GET_LISTENER,
  SetListener: SET_LISTENER,
  GetStatus: GET_STATUS,
  SetTime: SET_TIME,
  GetTime: GET_TIME,
  GetDoorControl: GET_DOOR_CONTROL,
  SetDoorControl: SET_DOOR_CONTROL,
  OpenDoor: OPEN_DOOR,
  GetCards: GET_CARDS,
  GetCardByID: GET_CARD_BY_ID,
  GetCardByIndex: GET_CARD_BY_INDEX,
  PutCard: PUT_CARD,
  DeleteCard: DELETE_CARD,
  DeleteCards: DELETE_CARDS,
  RecordSpecialEvents: RECORD_SPECIAL_EVENTS,
  GetEventIndex: GET_EVENT_INDEX,
  SetEventIndex: SET_EVENT_INDEX,
  GetEvent: GET_EVENT,

  NormallyOpen: NORMALLY_OPEN,
  NormallyClosed: NORMALLY_CLOSED,
  Controlled: CONTROLLED
}
