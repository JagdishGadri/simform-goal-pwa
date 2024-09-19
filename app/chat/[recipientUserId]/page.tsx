import React from 'react';
import Input from '@/components/chat/message-input';
import Message from '@/components/chat/message';
import { getChatTimeLineData } from '@/lib/data';
import ChatHeader from '@/components/chat/header';
import { auth } from '@/auth';
import { getDateString, getTimeString } from '@/lib/utils';

async function ChatPage({ params }: { params: { recipientUserId: string } }) {
  const currentChatDetails = await getChatTimeLineData(params.recipientUserId);
  const session = await auth();

  return (
    currentChatDetails?.recipientUserDetails && (
      <main className="min-w-[70%] flex-grow items-center flex-row p-2 bg-black text-white dark:bg-slate ">
        <header className="flex items-center justify-between">
          <ChatHeader userDetails={currentChatDetails?.recipientUserDetails} />
        </header>
        <section
          id="message-container"
          className=" min-h-[88%] max-h-[88%] overflow-scroll  text-gray-400 p-1 mb-2 gap-2 rounded-lg bg-sigMain border border-sigColorBgBorder"
        >
          {currentChatDetails?.messages &&
          Object.keys(currentChatDetails?.messages).length ? (
            Object.keys(currentChatDetails?.messages).map(
              (messageGroupDate, i) => {
                return (
                  <div className="flex flex-col" key={i}>
                    <p className="self-center border rounded-2xl mb-2 px-2 border-sigColorBgBorder ">
                      {currentChatDetails?.messages?.[messageGroupDate]?.[0]
                        ?.createdAt &&
                        getDateString(
                          currentChatDetails?.messages?.[messageGroupDate]?.[0]
                            ?.createdAt
                        )}
                    </p>
                    {currentChatDetails?.messages?.[messageGroupDate].map(
                      (message, i) => {
                        const isSameTimeAsLastMessage =
                          currentChatDetails?.messages?.[messageGroupDate]?.[
                            i - 1
                          ] &&
                          getTimeString(
                            currentChatDetails?.messages?.[messageGroupDate]?.[
                              i - 1
                            ]?.createdAt
                          ) === getTimeString(message?.createdAt);

                        return (
                          <>
                            <div className="flex flex-col text-xl mb-1 mt-2  items-center ">
                              {!isSameTimeAsLastMessage && (
                                <div className="text-sm">
                                  {message?.createdAt
                                    ? getTimeString(message.createdAt)
                                    : '-'}
                                </div>
                              )}
                            </div>
                            <Message
                              key={message._id.toString()}
                              message={message}
                            />
                          </>
                        );
                      }
                    ) ?? null}
                  </div>
                );
              }
            )
          ) : (
            <h2>No chat</h2>
          )}
        </section>
        <footer className="flex items-center justify-center">
          <Input params={params} senderId={session?.user?._id ?? ''} />
        </footer>
      </main>
    )
  );
}

export default ChatPage;
