import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Layout from "components/layout";
import PostHeader from "components/post-header";
import { getPostBySlug, getPaginatedPosts, listenPostUpdate } from "lib/api";
import BlockContent from "@sanity/block-content-to-react";
import HighlightCode from "components/highlight-code";
import { urlFor } from "lib/api";
import { useRouter } from "next/router";
import PreviewAlert from "components/preview-alert";

const PostDetail = ({ post, preview }) => {
  //const [post, setPost] = useState(initialPost);
  const router = useRouter();
  // useEffect(() => {
  //   const sub = listenPostUpdate(post.slug, (update) => {
  //     setPost(update.result);
  //   });
  //   return sub && sub.unsubscribe?.();
  // }, []);
  if (router.isFallback)
    return (
      <Layout>
        <div>Waiting...</div>
      </Layout>
    );
  if (!router.isFallback && !post?.slug)
    return (
      <Layout>
        <div>Уучлаарай ийм пост байхгүй байна...</div>
      </Layout>
    );
  return (
    <Layout>
      <Row>
        <Col md="12">
          {preview && <PreviewAlert />}
          {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
          <PostHeader post={post} />
          <br />
          <BlockContent
            blocks={post.content}
            serializers={serializers}
            imageOptions={{ w: 320, h: 240, fit: "max" }}
          />
        </Col>
      </Row>
    </Layout>
  );
};
export default PostDetail;
const serializers = {
  types: {
    code: (props) => (
      <HighlightCode language={props.node.language}>
        {props.node.code}
        <div className="code-filename">{props.node.filename}</div>
      </HighlightCode>
    ),
    image: (props) => (
      <div className={`blog-image blog-image-${props.node.position}`}>
        <img src={urlFor(props.node).height(400).url()} />
        <div className="code-filename" style={{ textAlign: "center" }}>
          {props.node.alt}
        </div>
      </div>
    ),
  },
};

export const getStaticProps = async ({ params, preview = false }) => {
  console.log(preview);
  const post = await getPostBySlug(params.slug, preview);
  console.log("-----------------", post);
  return {
    props: {
      post: post.length > 1 ? post[1] : post.length > 0 ? post[0] : {},
      preview,
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await getPaginatedPosts(0, 4);
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: true,
  };
};
