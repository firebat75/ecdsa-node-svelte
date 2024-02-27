<script>
    import { Accordion } from "bits-ui";
</script>

<Accordion.Root>
    <Accordion.Item value="first" class="text-3xl font-bold underline">
        <Accordion.Header>
            <Accordion.Trigger>First</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content class="text-3xl font-bold underline"
            >First accordion content</Accordion.Content
        >
    </Accordion.Item>
    <Accordion.Item value="second">
        <Accordion.Header>
            <Accordion.Trigger>Second</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Second accordion content</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="third">
        <Accordion.Header>
            <Accordion.Trigger>Third</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Third accordion content</Accordion.Content>
    </Accordion.Item>
</Accordion.Root>
